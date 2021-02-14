<template>
  <ion-page>
    <ion-loading
      :is-open="constloading"
      cssClass="loadingcs"
      message="Please wait...">
    </ion-loading>
    <ion-header>
      <ion-toolbar class="logobar">
        <img src="../../public/assets/cpi.jpg" class="logoicon" />
        <ion-title>Update Panel</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="datascan" class="cvchxx">
        <div class="detaillist parentlist">
          <div class="backtolist" @click="backtoscan">
            <ion-icon :icon="arrowUndoCircle"></ion-icon>
          </div>
          <ion-row>
            <ion-col>
              <h5 class="detaillist">{{datascan.namapanel }} / {{datascan.nopanel }}</h5>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="text-centercs">
              <img class="imagedetail" :src="datascan.urlImage">
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <h6 class="scandetail textleft">Hatchery : {{datascan.hatchery}}</h6>
              <ion-list lines="full" class="ion-no-margin">
                <ion-item class="scaned">
                  <ion-label>ELCB</ion-label>
                  <ion-select placeholder="Select One" :value="elcb" v-model="elcb">
                    <ion-select-option value="Yes">Yes</ion-select-option>
                    <ion-select-option value="No">No</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label>Arrester</ion-label>
                  <ion-select placeholder="Select One" :value="arrester" v-model="arrester">
                    <ion-select-option value="Yes">Yes</ion-select-option>
                    <ion-select-option value="No">No</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label>Grounding</ion-label>
                  <ion-select placeholder="Select One" :value="grounding" v-model="grounding">
                    <ion-select-option value="Yes">Yes</ion-select-option>
                    <ion-select-option value="No">No</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label position="fixed">Schedule</ion-label>
                  <ion-datetime class="textright wid100" display-format="DD MMM YY" placeholder="Select Date" v-model="schedule"></ion-datetime>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label>Rating</ion-label>
                  <ion-select placeholder="Select One" :value="rating" v-model="rating">
                    <ion-select-option value="Good">Good</ion-select-option>
                    <ion-select-option value="Moderate">Moderate</ion-select-option>
                    <ion-select-option value="Poor">Poor</ion-select-option>
                  </ion-select>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label position="fixed" autocomplete="off">Update</ion-label>
                  <ion-input placeholder="Update of panel" type="text" class="inputtext textright" v-model="updatepanel" autocomplete="off"></ion-input>
                </ion-item>
                <ion-item class="scaned">
                  <ion-label position="floating">Description</ion-label>
                  <ion-textarea :value="description" v-model="description" autocomplete="off"></ion-textarea>
                </ion-item>
                <div class="centercs logincs mtcs">
                  <ion-button color="primary" @click="actionUpdate">Save</ion-button>
                </div>
              </ion-list>
            </ion-col>
          </ion-row>
        </div>
      </div>
      <div v-else class="cvch">
        <a class="backhomecs" href="/">
          <ion-icon :icon="arrowUndoCircle"></ion-icon>
        </a>
        <ion-button color="primary" @click="scan"><ion-icon :icon="qrCodeOutline"></ion-icon>&nbsp; Scan</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonLoading, IonPage, IonHeader, IonToolbar, IonTitle, IonIcon, IonCol, IonRow, IonLabel, IonSelectOption, IonSelect, IonItem, IonInput, IonTextarea, IonList, IonContent, IonDatetime, IonButton, alertController } from '@ionic/vue';
import { arrowUndoCircle, qrCodeOutline } from 'ionicons/icons';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from '../config/';

export default  {
  name: 'Scan',
  components: { IonLoading, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonCol, IonRow, IonLabel, IonSelectOption, IonSelect, IonItem, IonInput, IonTextarea, IonList, IonContent, IonDatetime, IonPage },
  data (){
    return {
      constloading : true,
      datascan : null,
      keyscan : null,
      keyfrbs : null,
      email: null,
      hatchery : 'Subang',
      nopanel : null,
      namapanel : null,
      elcb : 'No',
      arrester : 'No',
      grounding : 'No',
      rating : 'G',
      date : null,
      time : null,
      newdate : null,
      description : null,
      selectPhoto : null,
      urlImage : null,
      schedule : null,
      updatecurrent : null,
      updatepanel : null,
      tempupdate : null,
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.constloading = false;
      } else {
        this.constloading = false;
      }
    });
  },
  methods : {
    scan : function () {
      BarcodeScanner.scan().then( res => {
        this.requestdata(res.text);
      })
    },
    requestdata : async function (params) {
      this.constloading = true;
      await firebase.database().ref('/datapanel/').orderByChild('qrcode').equalTo(params).once('value', async (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.keyfrbs = childSnapshot.key;
          this.datascan = childSnapshot.val();
          this.elcb = this.datascan.elcb;
          this.arrester = this.datascan.arrester;
          this.grounding = this.datascan.grounding;
          this.rating = this.datascan.rating;
          this.description = this.datascan.description;
          this.updatecurrent = this.datascan.update;
          this.schedule = this.datascan.schedule;
        })
      })
      this.constloading = false;
    },
    backtoscan : function () {
      this.datascan = null;
    },
    actionUpdate : async function () {
      this.constloading = true;
      const timeupdate = new Date().getTime(); 
      await firebase.database().ref('/datapanel/' + this.keyfrbs).set({
        qrcode : this.datascan.qrcode,
        hatchery : this.datascan.hatchery,
        nopanel : this.datascan.nopanel,
        namapanel : this.datascan.namapanel,
        elcb : this.elcb,
        arrester : this.arrester,
        grounding : this.grounding,
        rating : this.rating,
        time : this.datascan.time,
        date : this.formattgl(timeupdate),
        schedule : this.schedule,
        description : this.description,
        urlImage : this.datascan.urlImage,
        update : this.updatepanel,
      }, async (error) => {
        if (error) {
          this.constloading = false;
          const alert = await alertController
            .create({
              cssClass: 'ion-color-success',
              header: 'Failed',
              subHeader: error,
              buttons: [{
                text: 'Ok',
                handler: () => {
                  window.location.href="/";
                },
              }],
            });
          return alert.present();
        } else {
          await firebase.database().ref('log').push({
            qrcode : this.datascan.qrcode,
            hatchery : this.datascan.hatchery,
            nopanel : this.datascan.nopanel,
            namapanel : this.datascan.namapanel,
            time : timeupdate,
            date : this.formattgl(timeupdate),
            email : this.email,
            update : this.updatepanel,
            schedule : this.datascan.schedule,
          });
          this.constloading = false;
          const alert = await alertController
            .create({
              cssClass: 'ion-color-success',
              header: 'Success',
              subHeader: 'Data Sent.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  window.location.href="/";
                },
              }],
            });
          return alert.present();
        }
      });
    },
    formattgl : function (date) {
      const newdate = new Date(date);
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const bln = newdate.getMonth();
      const bln1 = months[bln];
      const tgl = newdate.getDate();
      const thn = newdate.getFullYear().toString().substr(-2);
      const tglfull = tgl + ' ' + bln1 + ' ' + thn;
      return tglfull;
    }, 
  },
  setup () {
    return {
      arrowUndoCircle,
      qrCodeOutline
    }
  }
}
</script>