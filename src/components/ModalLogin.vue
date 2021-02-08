<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="cvch">
        <ion-list lines="full" class="ion-no-margin">
          <ion-item>
            <ion-label class="centercs mbcs">HCPanel</ion-label>
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Email</ion-label>
            <ion-input placeholder="Input Your Email" type="email" v-model="email" autocomplete="off"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="fixed">Password</ion-label>
            <ion-input placeholder="Input Your Password" type="password" v-model="password" autocomplete="off"></ion-input>
          </ion-item>
          <div class="centercs logincs mtcs">
            <ion-button color="primary" @click="signIn">Login</ion-button>
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>

import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, alertController } from '@ionic/vue';
import firebase from '../config/';

export default ({
  name: 'ModalLogin',
  props: {
    name: String
  },
  data() {
    return {
      email : '',
      password : ''
    }
  },
  components: { IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonPage },
  methods : {
    signIn () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.alertcs('Success','Login success.');
        }).catch(() => {
          this.alertcs('Failed','Login failed.');
        });
      },
      onSignupClicked () {
        firebase.auth().createUserWithEmailAndPassword( this.email, this.password ).catch((error) => {
          console.log('Failed to create user', error);
        });
      },
      async alertcs (title, msg) {
        const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: title,
          subHeader: msg,
          buttons: ['OK'],
        });
        return alert.present();
      }
  }
});
</script>