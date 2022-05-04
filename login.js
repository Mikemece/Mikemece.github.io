const Username = document.getElementById("username")
const Password = document.getElementById("password")

registerUser(Username,Password)
    {
        try{
            setDoc(doc(this.BD, "userInfo", Username), 
            {
                Exp: 0,
                Password: Password,
                coins: 0,
                user: Username
            });
        }catch(e)
        {
            console.error("Error adding document: ", e);
        }
    };