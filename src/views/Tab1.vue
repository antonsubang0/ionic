<template>
  <ion-page>
    <div class="cvch">
      <div class="logoutcs" @click="logout">
        <ion-icon :icon="exitOutline"></ion-icon>
      </div>
      <div class="homecs">
        <a href="/tabs/create" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/cpi.jpg"></ion-img>
              <ion-card-title class="cardtitlecs">New Panel</ion-card-title>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              Input data and create QRcode
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/list" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/cpi.jpg"></ion-img>
              <ion-card-title class="cardtitlecs">List Panel</ion-card-title>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              List Panel on Hatchery
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/scan" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/cpi.jpg"></ion-img>
              <ion-card-title class="cardtitlecs">Scan Panel</ion-card-title>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              Scan QRcode on Panel
            </ion-card-content>
          </ion-card>
        </a>
        <a href="/tabs/history" class="anchorcs">
          <ion-card class="cardcs">
            <ion-card-header class="cardheadercs">
              <ion-img src="./assets/cpi.jpg"></ion-img>
              <ion-card-title class="cardtitlecs">History</ion-card-title>
            </ion-card-header>

            <ion-card-content class="cardcontentcs">
              History update of panel
            </ion-card-content>
          </ion-card>
        </a>
      </div>
    </div>
  </ion-page>
</template>
<style scoped>
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
  box-shadow: 2px 3px 5px #777;
  cursor: pointer;
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
  height: 190px;
  overflow: hidden;
  text-align: center;
  margin: 10px;
}
.cardtitlecs {
  font-size: 1em;
}
</style>
<script>
import { IonPage, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonImg } from '@ionic/vue';
import { exitOutline } from 'ionicons/icons';
import firebase from '../config/';

export default  {
  name: 'Tab1',
  components: { IonPage, IonIcon, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonImg },
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
    return {
      exitOutline
    }
  }
}
</script>