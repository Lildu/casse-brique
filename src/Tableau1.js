let life=3;
let score=0;
class Tableau1 extends Phaser.Scene{
    preload(){
        this.load.image('carre', 'assets/carre.png');
        this.load.image('cercle', 'assets/cercle.png');
    }

    create() {

        let me=this;






        this.largeur=800;
        this.hauteur=800;



        this.balle=this.physics.add.image(50,50,'cercle')
        this.balle.setDisplaySize(20,20)
        this.balle.body.setBounce(1.1,1.1)
        this.balle.setVelocityX(0)
        this.balle.setMaxVelocity(200)



        this.haut=this.physics.add.image(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true)

        this.droite=this.physics.add.image(0,0,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20,this.hauteur)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true)

        this.gauche=this.physics.add.image((this.largeur-20),0,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,this.hauteur)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true)





        this.raquette=this.physics.add.image(300,750,'carre').setOrigin(0,0);
        this.raquette.setDisplaySize(200,20)
        this.raquette.body.setAllowGravity(false)
        this.raquette.setVelocityX(0)
        this.raquette.setImmovable(true)

        for(let i=1;i<=5;i++){
            for(let t=1;t<=9;t++){

                let bricks= this.physics.add.image(50+(t*61),100+(i*31),'carre').setOrigin(0,0);
                bricks.setDisplaySize(60,30)
                bricks.setImmovable(true)
                this.physics.add.collider(this.balle,bricks,function () {
                    bricks.destroy(true)
                    score+=1;

                })
                if ((i==4)&&(t==4)){
                    bricks.setTintFill(0x00ff00)
                    score+=1;
                }
                if ((i==4)&&(t==5)){
                    bricks.setTintFill(0xff2d00)
                    score+=10;
                }
            }
        }



        this.physics.add.collider(this.balle,this.haut)
        this.physics.add.collider(this.balle,this.droite)



        this.physics.add.collider(this.balle,this.gauche)

        this.physics.add.collider(this.balle,this.raquette, function(){
            console.log("touche raquette");
            me.rebond(me.raquette)
        })




        this.Initiale();




        this.initKeyboard()

    }




    rebond(raquette){
        let me=this;

        console.log(raquette.y)
        console.log(me.balle.y)
        console.log((me.balle.y)-(raquette.y))

        let hauteurRaquette=raquette.displayHeight;

        let positionRelativeRaquette =(this.balle.y-raquette.y);

        positionRelativeRaquette =(positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette= positionRelativeRaquette*2-1;
        console.log(positionRelativeRaquette);

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativeRaquette * hauteurRaquette)
    }

    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    if (me.raquette.x<800){
                        me.raquette.setVelocityX(200)
                    }
                    else{
                        me.raquette.setX(750)
                        me.raquette.setVelocityX(0)
                    }


                    break

                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    if (me.raquette.x>0){
                        me.raquette.setVelocityX(-200)
                    }
                    else{
                        me.raquette.setX(20)
                        me.raquette.setVelocityX(0)
                    }


                    break



            }
        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(0)
                    break
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(0)
                    break

            }
        });
    }
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.Initiale();
    }


    Initiale (){
        this.balle.setX(380);
        this.balle.setY((this.hauteur/2));
        this.balle.setVelocity(100);
        this.raquette.setX(350);



    }
    update(){

        if(this.balle.y >= 800) {
            this.Initiale();
            this.life-=1;

        }

        if(this.raquette.x<0){
            this.raquette.setX(0)
        }
        if(this.raquette.x>600){
            this.raquette.setX(600)
        }
        if(life == 0){
            /**loose*/
        }
        if(score <= 55){
            /**WIN*/
        }

    }
}