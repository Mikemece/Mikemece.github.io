import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, doc, setDoc, query, 
	where, collection, getDoc} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";


export class DBManager
{
	static BD;

    init()
    {    
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

	insert()
	{

	}

	getCoins()
	{

	}

	delete()
	{

	}
/**
 * Registra el usuario con los datos proporcionados
 * Te devuelve un valor numérico para asegurarte que ha sido correcto
 * 0 es error
 * 1 es correcto
 */
	registerUser(usuario,contra)
	{
		let resultao = 0;
		try{
			setDoc(doc(DBManager.BD, "userInfo", usuario), 
			{
				Exp: 0,
				Password: contra,
				coins: 0,
				user: usuario,
				Equipped:
				{
					//comida:true
				}
			});
			resultao = 1;
		}catch(e)
		{
			console.error("Error registering user: ", e);
		}
		return resultao;
	};
/**
 * El método loginUser necesita 2 parametros, el usuario y la contraseña,
 * este comprueba que esté registrado, en caso de error de las credenciales
 * te devuelve el valor numérico 0.
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
	async loginUser(usuario, contra)
	{
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let usuarioresultao = 0;

		if (docSnap.exists()) {
			if(contra == docSnap.get("Password"))
			{
				usuarioresultao = 
				{
					user: usuario,
					Password: contra, 
					EXP: docSnap.get("Exp"),
					coins: docSnap.get("coins"),
					equipped: docSnap.get("Equipped")
				}
				//console.log(usuarioresultao);
				
			}else
			{
				console.log("La contraseña es incorrecta");
				usuarioresultao = 0;
			}
			
		  } else {
			// doc.data() will be undefined in this case
			usuarioresultao = 0;
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
	async getExp(usuario)
	{
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if(docSnap.exists())
		{
			resultao = await docSnap.get("Exp");
			//console.log(resultao);
		}
		return resultao;
	}

	/** El parámetro es el nombre de usuario, se asume que es correcto.
 * Igualmente en caso de error devuelve -1
 * En caso de ser correcto devuelve el map de los objetos que posee el usuario con un booleano que indica si lo tiene equipado.
 * 
 * Ejemplo de uso:
 * var experiencia = await getExp("usuario1");
	 */
	 async getItemsEquipped(usuario)
	 {
		 const docRef = doc(DBManager.BD, "userInfo", usuario);
		 const docSnap = await getDoc(docRef);
		 let resultao = -1;
		 if(docSnap.exists())
		 {
			 resultao = await docSnap.get("Equipped");
			 //console.log(resultao.get("jaja"));
		 }
		 return resultao;
	 }

	getItem()
	{

	}

	getShop()
	{

	}

	getQuestion()
	{

	}

	/** El parámetro es el nombre de usuario, se asume que es correcto.
 * Igualmente en caso de error devuelve -1
 * En caso de ser correcto devuelve el map de los objetos que posee el usuario con un booleano que indica si lo tiene equipado.
 * 
 * Ejemplo de uso:
 * var experiencia = await getExp("usuario1");
	 */
	async getInventory(usuario)
	{
		const docRef = doc(DBManager.BD, "userInfo", usuario);
		const docSnap = await getDoc(docRef);
		let resultao = -1;
		if(docSnap.exists())
		{
			resultao = await docSnap.get("Equipped");
		}
		return resultao;
	}

}