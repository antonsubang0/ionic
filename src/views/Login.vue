<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="cvch">
        <ion-list lines="full" class="ion-no-margin">
          <div v-if="halamanRegister">
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
              <ion-button color="success" @click="onSignupClicked">Register</ion-button>
            </div>
            <div class="registercs">
              <p>If you have account.</p>
              <p>Back to <span @click="bukaLogin">Login</span></p>
            </div>
          </div>
          <div v-else>
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
            <div class="registercs">
              <p>Do you have the account ?</p>
              <p>If not, please <span @click="bukaRegister">Register</span></p>
            </div>
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
<style>
  .registercs {
    font-weight: 0.5rem;
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  .registercs p {
    margin-top: 0;
    margin-bottom: 5px;
  }
  .registercs p span {
    text-decoration: underline;
    color: blue;
  }
  .registercs p span:hover {
    cursor: pointer;
  }
</style>

<script>

import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, alertController } from '@ionic/vue';
import firebase from '../config/';

export default ({
  name: 'Login',
  data() {
    return {
      email : '',
      password : '',
      halamanRegister : false,
    }
  },
  components: { IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonPage },
  mounted() {
    this.firstload();
  },
  methods : {
    signIn () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.alertcs('Success','Login success.');
          window.location.href="/";
        }).catch(() => {
          this.alertcs('Failed','Login failed.');
        });
      },
      bukaRegister : function () {
        this.halamanRegister = true;
      },
      bukaLogin : function () {
        this.halamanRegister = false;
      },
      firstload : async function () {
        await firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.constloading = false;
            window.location.href="/";
          } else {
            this.constloading = false;
          }
        })
      },
      onSignupClicked () {
        firebase.auth().createUserWithEmailAndPassword( this.email, this.password )
        .then( () => { 
          this.alertcs('Success','Registration successfully. Please Login.');
          this.halamanRegister = false;
        })
        .catch(() => {
          this.alertcs('Failed','Registration failed.');
          this.halamanRegister = true;
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