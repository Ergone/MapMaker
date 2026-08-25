export class Tools {

    constructor(div,menu,modif) {
        this.div = div;
        this.menu = menu;
        this.modif = modif;
    }

    createMenu(event){

        if(!document.getElementById('menu-list')){

            const menuList = document.createElement('ul');
            menuList.classList.add('list-menu');
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

        if(!document.getElementById('modif-list')){

            const modifList = document.createElement('ul');
            modifList.classList.add('list-menu');
            modifList.id = 'modif-list';

            const items = [
                { text: 'Point'},
                { text: 'Test1'},
                { text: 'Test2'},
                { text: 'Test3'}
            ];

            items.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('menu-item');
                li.textContent = item.text;

                modifList.appendChild(li);
            });

            this.modif.appendChild(modifList);

            modifList.style.display = 'block';

        } else if(this.modif.children.item(0).style.display === "none"){ // Afficher le menu modif si il est caché
            this.modif.children.item(0).style.display = "block";
        } else if(this.modif.children.item(0).style.display === "block"){ // Cacher le menu modif si il est affiché
            this.modif.children.item(0).style.display = "none";
        } else {
            //rien pour l'instant
        }
    }

}