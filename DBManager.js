import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
	getFirestore, doc, setDoc, query, addDoc, updateDoc,
	where, collection, getDoc, getDocs
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

/*
IMPORTANTE

PARA QUE FUNCIONE DBMANAGER NECESITA:

·Ser llamado como un módulo (type = "module")
·El método en el que se llame debe ser async(esto es necesario para permitir el await)
·llamar a los métodos async de esta clase con await(sino te dará una promesa y solo tu y dios podrás entenderlo xd)

*/

export class DBManager {
	static BD;
	/**
	 * Es el método inicial de la BD. Sirve para inicializarla, hace falta llamarlo antes de hacer cualquier tipo de operación.
	 * 
	 * Ejemplo de uso:
	 * <script type="module"> //Ejemplo de integración de la bbdd con codigo usado para probar la bbdd
		import {DBManager} from "./DBManager.js";
		const db = new DBManager();
		db.init();
		//db.registerUser("diablo", "mami");
		//db.loginUser("diablo", "mami");
		//console.log(await db.loginUser("diablo", "mami"));
		//console.log(await db.getExp("diablo"));
		//console.log(await db.getInventory("diablo"));
		//console.log(await db.getItemsEquipped("diablo"));
		console.log(await db.getCoins("diablo"));
	</script>
	 * 
	 */
	init() {
		// Import the functions you need from the SDKs you need
		// TODO: Add SDKs for Firebase products that you want to use
		// https://firebase.google.com/docs/web/setup#available-libraries

		// Your web app's Firebase configuration
		const firebaseConfig = {
			apiKey: "AIzaSyAcI2DuAbi1MC5YtgIfYQrbs1nGwMJlx2c",
			authDomain: "pinwi-softix-uma.firebaseapp.com",
			projectId: "pinwi-softix-uma",
			storageBucket: "pinwi-softix-uma.appspot.com",
			messagingSenderId: "636601225644",
			appId: "1:636601225644:web:f21b242527e7598ec1aa09"
		};

		// Initialize Firebase
		const app = initializeApp(firebaseConfig);

		const db = getFirestore(app);
		DBManager.BD = db;

		console.log("DB inicializada correctamente");

		/*async function getCities(db) {
	  const citiesCol = collection(db, 'inventory');
	  const citySnapshot = await getDocs(citiesCol);
	  const cityList = citySnapshot.docs.map(doc => doc.data());
	  return cityList;
	}
		console.log(getCities(db));*/

	}

	/** El parámetro es el nombre de usuario, se asume que es correcto.
 * Igualmente en caso de error devuelve -1
 * En caso de ser correcto devuelve el valor de las monedas del usuario.
 * 
 * Ejemplo de uso:
 * var monedas = await getCoins("usuario1");
	 */
	async getCoins(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("coins");
		}
		return resultao;
	}

	/** El parámetro es el nombre de usuario y el dinero actualizado, se asume que es correcto.
 * En caso de error pues hay error
 * En caso de ser correcto actualiza el valor de las monedas del usuario en la base de datos
 * 
 * Ejemplo de uso:
 * await getCoins("usuario1", money);
	 */
	async setCoins(usuario, money) {
		try {
			updateDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					coins: money
				})
		} catch (e) {
			console.error("Error saving money: ", e);
		}
		return 1
	}

	/**
	 * Registra el usuario con los datos proporcionados
	 * Te devuelve un valor numérico para asegurarte que ha sido correcto
	 * 0 es error
	 * 1 es correcto
	 */
	registerUser(usuario, contra, petname) {
		let resultao = 0;
		try {
			setDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					/*Exp: 0,
					Password: contra,
					coins: 0,
					petName: petname,
					user: usuario,
					Equipped:*/
					Exp: 0,
					Password: contra,
					Buy: [],
					coins: 0,
					petName: petname,
					user: usuario,
					Equip: [],
					Equipped: {
						Head: "b1",
						Body: "b2",
						Down: "b3",
						Face: "b4"
					},

				});
			resultao = 1;
		} catch (e) {
			console.error("Error registering user: ", e);
		}
		return resultao;
	};
	/**
	 * El método loginUser necesita 2 parametros, el usuario y la contraseña,
	 * este comprueba que esté registrado, en caso de error de las credenciales
	 * te devuelve el valor numérico 0, y en caso del usuario no existir te devuelve -1.
	 * En el caso de haber acertado te devuelve un objeto con los parametros:
	 * user, Password, EXP, coins y equipped
	 * 
	 * por ejemplo voy a usar coins, pero con todos es igual. Se llama tal que así:
	 * var objeto = await loginUser(usuario, contra);
	 * objeto.coin;
	 * ó también se puede llamar así:
	 * objeto['coin'];
	 * 
	 * igual con el resto de parametros 
	 */
	async loginUser(usuario, contra) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let usuarioresultao = 0;

		if (docSnap.exists()) {
			if (contra == docSnap.get("Password")) {
				usuarioresultao =
				{
					user: usuario,
					Password: contra,
					EXP: docSnap.get("Exp"),
					coins: docSnap.get("coins"),
					equipped: docSnap.get("Equipped")
				}
				//console.log(usuarioresultao);

			} else {
				console.log("La contraseña es incorrecta");
				usuarioresultao = 0;
			}

		} else {
			// doc.data() will be undefined in this case
			usuarioresultao = -1;
			console.log("El usuario introducido no está registrado");
		}
		return usuarioresultao;
		//console.log(docSnap);

	}


	/** El parámetro es el nombre de usuario, se asume que es correcto.
	 * Igualmente en caso de error devuelve -1
	 * En caso de ser correcto devuelve el integer de la experiencia.
	 * 
	 * Ejemplo de uso:
	 * var experiencia = await getExp("usuario1");
	 */
	async getExp(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("Exp");
			//console.log(resultao);
		}
		return resultao;
	}

	/** El parámetro es el nombre de usuario y la exp actualizada, se asume que es correcto.
* En caso de error pues hay error
* En caso de ser correcto actualiza el valor de la exp del usuario en la base de datos
* 
* Ejemplo de uso:
* await getCoins("usuario1", exp);
 */
	async setExp(usuario, experiencia) {
		try {
			updateDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					Exp: experiencia
				})
		} catch (e) {
			console.error("Error saving exp: ", e);
		}
		return 1
	}

	/** El parámetro es el nombre de usuario, se asume que es correcto.
 * Igualmente en caso de error devuelve -1
 * En caso de ser correcto devuelve un array de Strings con los nombres de los objetos equipados.
 * 
 * Ejemplo de uso:
 * var equipados = await getItemsEquipped("usuario1");
	 */
	async getItemsEquipped(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("Equipped");
			let arrayresultao = [];
			//console.log(resultao);
			for (let i = 0; i < Object.getOwnPropertyNames(resultao).length; i++) {
				//console.log(resultao);
				if (resultao[Object.getOwnPropertyNames(resultao)[i]]) {
					arrayresultao.push(Object.getOwnPropertyNames(resultao)[i]);
				}

			}
			resultao = arrayresultao;
		}
		return resultao;
	}

	/** El parámetro es el nombre del item, 
	* en caso de error devuelve -1
	* En caso de ser correcto devuelve el valor numérico del precio.
	* 
	* Ejemplo de uso:
	* var precio = await getItemPrice("ternera");
		*/
	async getItemPrice(nombreItem) {
		const docRef = doc(DBManager.BD, "shop", nombreItem);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("Price");
		}
		return resultao;
	}

	/** El parámetro es el nombre del item, 
* en caso de error devuelve -1
* En caso de ser correcto devuelve el valor numérico de la experiencia que da.
* 
* Ejemplo de uso:
* var exp = await getItemExp("ternera");
	*/
	async getItemExp(nombreItem) {
		const docRef = doc(DBManager.BD, "shop", nombreItem);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("XP");
		}
		return resultao;
	}


	/** Requiere de un parámetro, nombreItem, en el caso de no ser correcto devuelve -1
	 * 
	 * Cuando es correcto devuelve un objeto con todos los parámetros del Item especificado, 
	 * cambia su estructura dependiendo de si es cosmético o no
	 * es la propiedad skin, en el caso de true es cosmético
	 * 
	 * En caso de ser cosmético sus propiedades son:
	 * Icon, ImageIG, LvlUnlocked, Name, Price, XP y skin
	 * 
	 * En el caso de ser comestible sus propiedades son:
	 * Icon, LvlUnlocked, Name, Price, XP, skin
	 * 
	 * Para llamar a las propiedades por ejemplo voy a usar skin, pero con todos es igual. Se llama tal que así:
	 * var objeto = await getItem(nombreItem);
	 * objeto.skin;
	 * ó también se puede llamar así:
	 * objeto['skin'];
	 * 
	 * igual con el resto de parametros 
	 * 
	 */
	async getItem(nombreItem) {
		const docRef = doc(DBManager.BD, "shop", nombreItem);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			let cosmetico = await docSnap.get("skin");
			if (cosmetico) {
				resultao =
				{
					Icon: await docSnap.get("Icon"),
					ImageIG: await docSnap.get("ImageIG"),
					LvlUnlocked: await docSnap.get("LvlUnlocked"),
					Name: await docSnap.get("Name"),
					Price: await docSnap.get("Price"),
					XP: await docSnap.get("XP"),
					skin: await docSnap.get("skin")
				}
			} else {
				resultao =
				{
					Icon: await docSnap.get("Icon"),
					LvlUnlocked: await docSnap.get("LvlUnlocked"),
					Name: await docSnap.get("Name"),
					Price: await docSnap.get("Price"),
					XP: await docSnap.get("XP"),
					skin: await docSnap.get("skin")
				}
			}
		}
		return resultao;
	}

	/** No requiere de ningún parametro, simplemente devuelve un array con los nombres de todos los objetos que existen en el juego.
	 * 
	 * No hace ninguna comprobación porque la única manera en la que esto estaría vacío sería si la BD se corrompiese.
	 */
	async getShop() {
		const CollectionSnapShot = await getDocs(collection(DBManager.BD, "shop"));
		let resultao = [];
		CollectionSnapShot.forEach((doc) => {
			//console.log(doc.id, " => ", doc.data());
			resultao.push(doc.id);
		});
		return resultao;

	}


	/** El parámetro es el nombre del usuario, 
* en caso de error devuelve -1
* En caso de ser correcto devuelve euna lista de con los nombres de los objetos comprados.
* 
* Ejemplo de uso:
* var bought = await getBuy("pepe");
	*/
	async getBuy(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("Buy");
		}
		return resultao;
	}

	/** El parámetro es el nombre del usuario y una lista con el nombre de los objetos comprados, 
* en caso de error devuelve un error
* En caso de ser correcto actualiza la lista de objetos comprados en la base de datos.
* 
* Ejemplo de uso:
* await setBuy("pepe", bought);
	*/
	async setBuy(usuario, buy) {
		try {
			updateDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					Buy: buy
				})
		} catch (e) {
			console.error("Error changing buy: ", e);
		}
		return 1
	}

	/** El parámetro es el nombre del usuario, 
* en caso de error devuelve -1
* En caso de ser correcto devuelve un map con el elemento equipado en cada psoición.
* 
* Ejemplo de uso:
* var equipped = await getEquipped("pepe");
	*/
	async getEquipped(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let equipped = ""
		if (docSnap.exists) {
			equipped = await docSnap.get("Equipped")
		}
		return equipped
	}
	/** El parámetro es el nombre del usuario y una lista con el nombre de los objetos equipados, 
* en caso de error devuelve un error
* En caso de ser correcto actualiza el map de objetos equipados en la base de datos.
* 
* Ejemplo de uso:
* await setEquip("pepe", equipped);
	*/
	async setEquip(usuario, equip) {
		try {
			updateDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					Equipped: equip
				})
		} catch (e) {
			console.error("Error changing equip: ", e);
		}
		return 1
	}

	/** El parámetro es el nombre de usuario, se asume que es correcto.
 * Igualmente en caso de error devuelve -1
 * En caso de ser correcto devuelve el map de los objetos que posee el usuario con un booleano que indica si lo tiene equipado.
 * 
 * Ejemplo de uso:
 * var experiencia = await getExp("usuario1");
	 */
	async getInventory(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if (docSnap.exists()) {
			resultao = await docSnap.get("Equipped");
		}
		return resultao;
	}

	/*
	Esta función devuelve el nombre de la mascota del usuario pasado como parámetro.
	Se asume que todos los usuarios tienen un nombre de mascota puesto que en el registro 
	hace falta especificar el nombre de la mascota si no, no deja registrarse.
	Si por algún casual el usuario no tiene nombre de mascota, este devolverá undefined.
	*/
	async getPetName(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let name = ""
		if (docSnap.exists()) {
			name = await docSnap.get("petName")
		}
		return name
	}


	async setPetName(usuario, petname) {
		try {
			setDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					petName: petname
				})
		} catch (e) {
			console.error("Error changing the pet name: ", e);
		}
		return 1
	}



	async setFecha(usuario, fecha) {
		try {
			updateDoc(doc(DBManager.BD, "userInfo", usuario),
				{
					UltimoJuego: fecha
				})
		} catch (e) {
			console.error("Error changing the pet name: ", e);
		}
		return 1
	}


	async getFecha(usuario) {
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let fecha = ""
		if (docSnap.exists) {
			fecha = docSnap.get("UltimoJuego")
		}
		return fecha
	}

}