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
        <ion-title>New Panel</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <a class="backhomecs" href="/">
        <ion-icon :icon="arrowUndoCircle"></ion-icon>
      </a>
      <ion-list lines="full" class="ion-no-margin">
        <div class="centerbarcode">
          <ion-row>
            <ion-col>
              <div id="canvas">
                <qrcode-vue :value="(hatchery) ? time + hatchery + nopanel : qrvalue" :size="size" level="H" renderAs="canvas" />
              </div>
            </ion-col>
            <ion-col>
              <ion-img class="imagecreate" v-if="urlImage" :src="urlImage" @click="removePhoto"></ion-img>
              <div v-else class="pickphoto">
                <ion-icon :icon="cameraOutline" @click="takephoto"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
        </div>
        <ion-item>
          <ion-label>Hatchery</ion-label>
          <ion-select placeholder="Select One" :value="hatchery" v-model="hatchery">
            <ion-select-option v-for="listh in listhatchery" :key="listh.id" :value="listh.nama">{{ listh.nama }}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Number</ion-label>
          <ion-input placeholder="Input panel number" class="textright" type="number" v-model="nopanel" autocomplete="off"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Name</ion-label>
          <ion-input placeholder="Input panel name" type="text" class="inputtext textright" v-model="namapanel" autocomplete="off"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>ELCB</ion-label>
          <ion-select placeholder="Select One" :value="elcb" v-model="elcb">
            <ion-select-option value="Yes">Yes</ion-select-option>
            <ion-select-option value="No">No</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Arrester</ion-label>
          <ion-select placeholder="Select One" :value="arrester" v-model="arrester">
            <ion-select-option value="Yes">Yes</ion-select-option>
            <ion-select-option value="No">No</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Grounding</ion-label>
          <ion-select placeholder="Select One" :value="grounding" v-model="grounding">
            <ion-select-option value="Yes">Yes</ion-select-option>
            <ion-select-option value="No">No</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Date Check</ion-label>
          <ion-datetime display-format="DD MMM YY" placeholder="Select Date" @ionChange="tambahhari" v-model="date"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="fixed">Schedule</ion-label>
          <ion-input placeholder="Date" type="text" class="textright" v-model="newdate" readonly></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Rating</ion-label>
          <ion-select placeholder="Select One" :value="rating" v-model="rating">
            <ion-select-option value="Good">Good</ion-select-option>
            <ion-select-option value="Moderate">Moderate</ion-select-option>
            <ion-select-option value="Poor">Poor</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea :value="description" v-model="description" autocomplete="off"></ion-textarea>
        </ion-item>
        <div class="centercs logincs mtcs">
          <ion-button color="primary" @click="actionCreate">Save</ion-button>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSelect,
  IonSelectOption, IonLabel, IonInput, IonItem, IonButton, IonList, IonDatetime, IonRow, IonCol, IonLoading, IonImg, IonTextarea, alertController } from '@ionic/vue';
import { arrowBackOutline, cameraOutline, arrowUndoCircle } from 'ionicons/icons';
// import { Plugins, FilesystemDirectory } from "@capacitor/core";
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Camera } from 'ionic-native';
import QrcodeVue from 'qrcode.vue';
import firebase from '../config/';
// const { Filesystem } = Plugins;

export default  {
  name: 'Create',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonSelect,
  IonSelectOption, IonLabel, IonInput, IonItem, IonButton, IonList, IonDatetime,  IonRow, IonCol, IonLoading, IonImg, IonTextarea,QrcodeVue },
  data() {
    return {
      constloading : true,
      qrvalue: 'Subang',
      size: 150,
      listhatchery : null,
      interval: true,
      email: null,
      hatchery : null,
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
    }
  },
  mounted () {
    this.time = new Date().getTime();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        this.allhatchery();
        setInterval( () => {
          if (this.interval) {
            this.time = new Date().getTime();
            this.qrvalue = this.time + this.hatchery + this.nopanel;
          }
        }, 30000);
      }
    });
  },
  methods : {
    allhatchery : async function () {
      await firebase.database().ref('/hatchery').once('value', (snapshot) => {
        const listhatcheryx = [];
        snapshot.forEach((childSnapshot) => {
          const sement = {
            id : childSnapshot.key,
            nama : childSnapshot.val().nama,
          };
          listhatcheryx.push(sement);
        })
        this.listhatchery = listhatcheryx;
        this.hatchery = 'Subang';
      });
      this.constloading = false;
    },
    download : async function () {
      const canvas = document.querySelector("canvas");
      // const temp = new Blob([canvas], {type: 'image/svg+xml'});
      const dataURL = canvas.toDataURL().toString();
      const imageData = dataURL.split(',')[1];
      Base64ToGallery.base64ToGallery( imageData, { prefix: 'lar_panel-' + this.nopanel, mediaScanner: true })
      .then(res => { this.simpangambar = res; }, err => {this.simpangambar = err; });     
      // const result = await Filesystem.writeFile({
      //   path: fileName,
      //   data: imageData,
      //   directory: FilesystemDirectory.External,
      // });
      // console.log(result);
      // this.simpangambar = result;
    },
    actionCreate : function () {
      if (this.nopanel == null || this.namapanel == null || this.date == null || this.description == null || this.urlImage == null) {
        this.gagalCreate();
      } else {
        this.create();
      }
    },
    create : async function ()  {
      this.constloading = true;      
      this.interval = false;
      await firebase.database().ref('datapanel').push({
        qrcode : this.qrvalue,
        hatchery : this.hatchery,
        nopanel : this.nopanel,
        namapanel : this.namapanel,
        elcb : this.elcb,
        arrester : this.arrester,
        grounding : this.grounding,
        rating : this.rating,
        time : this.time,
        date : this.formattgl(this.date),
        schedule : this.newdate,
        description : this.description,
        urlImage : this.urlImage,
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
            qrcode : this.qrvalue,
            hatchery : this.hatchery,
            nopanel : this.nopanel,
            namapanel : this.namapanel,
            time : this.time,
            date : this.formattgl(this.date),
            email : this.email,
            update : 'Create data panel.',
            schedule : this.formattgl(this.date),
          });
          this.download();
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
          this.hatchery = 'Subang';
          this.nopanel = null;
          this.namapanel = null;
          this.elcb = 'No';
          this.arrester = 'No';
          this.grounding = 'No';
          this.date = null;
          this.time = null;
          this.rating = 'G';
          this.newdate = null;
          this.selectPhoto = null;
          this.urlImage = null;
          this.interval = true;
          return alert.present();
        }
      });
    },
    gagalCreate : async function () {
      const alert = await alertController
        .create({
          cssClass: 'danger',
          header: 'Failed',
          subHeader: 'Check data again.',
          buttons: [{
            text: 'Ok',
            handler: (e) => {
              console.log(e);
            },
          }],
        });
      return alert.present();
    },
    tambahhari : function () {
      const date = new Date(this.date);
      const oneMonth = 30*24*60*60*1000;
      const newtime = date.getTime() + oneMonth;
      this.newdate = this.formattgl(newtime);
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
    takephoto : function () {
      const CameraOptions = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        sourceType : Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum : false,
        targetWidth: 500,
        targetHeight: 500,
        correctOrientation : false,
      }
      Camera.getPicture(CameraOptions).then((imageData) => {
          this.selectPhoto= this.dataURLtoBlob('data:image/jpeg;base64, ' + imageData);
          this.upload();
      }),(err) => {
        console.log(err);
      }
    },
    dataURLtoBlob : function (data) {
      const binary = atob(data.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type : 'image/jpeg'})
    },
    upload : function () {
      const nametime = new Date().getTime();
      if (this.selectPhoto) {
        firebase.storage().ref().child('images/' + nametime + 'myimage.jpg').put(this.selectPhoto)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            this.urlImage = url;
          });
        }).catch(function(error) {
          console.log('Upload failed:', error);
        });
      }
    },
    removePhoto : function () {
      firebase.storage().refFromURL(this.urlImage).delete().then(() => {
        this.urlImage=null;
      }).catch(async () => {
        const alert = await alertController
        .create({
          cssClass: 'danger',
          header: 'Failed',
          subHeader: 'Delete image.',
          buttons: ['OK'],
        });
      return alert.present();
      })
    }
  },
  setup(){
    return {
      arrowBackOutline,
      cameraOutline,
      arrowUndoCircle
    }
  }
}
</script>