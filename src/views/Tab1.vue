<template>
  <ion-page>
    <div class="cvch bgcs">
      <a href="/tabs/schedule" class="schedulecs"><ion-icon :icon="documentTextOutline"></ion-icon>
      </a>
      <div class="logoutcs" @click="logout">
        <ion-icon :icon="exitOutline"></ion-icon>
      </div>
      <a href="/tabs/about" class="aboutcs"><ion-icon :icon="informationOutline"></ion-icon>
      </a>
      <div class="homecs">
        <a href="/tabs/create" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/new.png"></ion-img>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              Input data and create QRcode
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/list" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/list.png"></ion-img>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              List Panel on Hatchery
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/scan" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/scan.png"></ion-img>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              Scan QRcode on the panel
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/history" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/history.png"></ion-img>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              History update of the panel
            </ion-card-content>
          </ion-card>
        </a>
      </div>
    </div>
  </ion-page>
</template>
<style scoped>
.bgcs {
  background-image: url('../../public/assets/bg.png');
  background-size: cover;
}
.logoutcs {
  position: fixed;
  top: 25px;
  right: 25px;
  font-size: 25px;
  color: #99f;
  text-align: center;
  padding: 5px 7px;
  z-index: 3;
  background-color: #eee;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  box-shadow: 1px 2px 4px #777;
  cursor: pointer;
}
a.schedulecs {
  position: fixed;
  top: 25px;
  left: 25px;
  font-size: 23px;
  color: #99f;
  text-align: center;
  padding: 5px 7px;
  z-index: 3;
  background-color: #eee;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  box-shadow: 1px 2px 4px #777;
  cursor: pointer;
  text-decoration: none;
}
a.aboutcs {
  position: fixed;
  bottom: 25px;
  left: 25px;
  font-size: 23px;
  color: #99f;
  text-align: center;
  padding: 5px 7px;
  z-index: 3;
  background-color: #eee;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  box-shadow: 1px 2px 4px #777;
  cursor: pointer;
  text-decoration: none;
}
a.anchorcs {
  text-decoration: inherit;
  color: inherit;
  cursor: auto;
}
.cardcontentcs.md.card-content-md.hydrated {
  font-size: 0.8em;
}
.cardheadercs {
  padding: 5px;
}
.homecs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.cardcs {
  width: 120px;
  overflow: hidden;
  text-align: center;
  margin: 10px;
  box-shadow: 3px 3px 5px black;
  background-color: #eee;
}
.cardtitlecs {
  font-size: 1em;
}
</style>
<script>
import { IonPage, IonIcon, IonCard, IonCardContent, IonCardHeader, IonImg, useBackButton } from '@ionic/vue';
import { exitOutline, documentTextOutline, informationOutline } from 'ionicons/icons';
import firebase from '../config/';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

export default  {
  name: 'Tab1',
  components: { IonPage, IonIcon, IonCard, IonCardContent, IonCardHeader, IonImg },
  methods : {
    logout : function () {
      firebase.auth().signOut().then(() => {
        window.location.href="/login/";
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  setup(){
     useBackButton(-1, () => {
        App.exitApp();
    });
    return {
      exitOutline,
      documentTextOutline,
      informationOutline
    }
  }
}
</script>