export class Tools {

    constructor(div,menu,modif) {
        this.div = div;
        this.menu = menu;
        this.modif = modif;
    }

    createMenu(event){

        if(!document.getElementById('menu-list')){

            const menuList = document.createElement('ul');
            menuList.id = 'menu-list';

            const items = [
                { text: 'Test'},
                { text: 'Test1'},
                { text: 'Test2'},
                { text: 'Test3'}
            ];

            items.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('menu-item');
                li.textContent = item.text;

                menuList.appendChild(li);
            });

            this.menu.appendChild(menuList);

            menuList.style.display = 'block';

        } else if(this.menu.children.item(0).style.display === "none"){ // Afficher le menu si il est caché
            this.menu.children.item(0).style.display = "block";
        } else if(this.menu.children.item(0).style.display === "block"){ // Cacher le menu si il est affiché
            this.menu.children.item(0).style.display = "none";
        } else {
            //rien pour l'instant
        }

    }

    createModif(event){

    }

}