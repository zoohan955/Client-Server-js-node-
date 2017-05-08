//objets
function  User  (name,age ){
    this.name=name;
    this.dificulty=()=>{ 
        return (age<10)?1:((age<17)?2:3);
    }
};


user1 = new User();

//console.log(user1.name+" "+ user1.dificulty);
/*


//----------------------------------------------/СОБЫТИЯ


button.addEventListener('click', (e)=>{
e.preventDefault();

fetch('data.json')
    .then ((response)=>{
        return response.json();
    })
    .then((response) =>{
        console.log(response);
    });


});
*/

