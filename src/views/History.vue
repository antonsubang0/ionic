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
        <ion-title>History Panel</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="datadetail">
        <div class="detaillist parentlist">
          <div class="backtolist" @click="backtolist">
            <ion-icon :icon="arrowUndoCircle"></ion-icon>
          </div>
          <ion-row>
            <ion-col>
              <h5 class="detaillist"> {{datadetail.namapanel }} / {{datadetail.nopanel }}</h5>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="text-centercs">
              <img class="imagedetail" :src="datadetail.urlImage">
            </ion-col>
            <ion-col class="textleft">
              <h6 class="detaillist">Hatchery : {{datadetail.hatchery}}</h6>
              <p class="detaillist">Rating : <span :class="{ 'successcs': datadetail.rating=='Good', 'warningcs': datadetail.rating=='Moderate', 'dangercs': datadetail.rating=='Poor' }"> {{ datadetail.rating }}</span></p>
              <p class="detaillist">Arrester : {{datadetail.arrester}}</p>
              <p class="detaillist">ELCB : {{datadetail.elcb}}</p>
              <p class="detaillist">Grounding : {{datadetail.grounding}}</p>
              <p class="detaillist">Schedule : <span class="dangercs">{{datadetail.schedule}}</span></p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col class="detailrow">
              <p class="detaillist">Description : {{datadetail.description}}</p>
            </ion-col>
          </ion-row>
          <ion-row v-if="history">
            <ion-col class="detailrow">
              <h6>History : </h6>
              <p v-for="listupdate in history" :key="listupdate.time" class="detaillist"> {{ listupdate.date }} - {{ listupdate.update }} by {{ listupdate.email }}, before plan : {{ listupdate.schedule }} </p>
            </ion-col>
          </ion-row>
        </div>
      </div>
      <div v-else>
        <a class="backhomecs" href="/">
          <ion-icon :icon="arrowUndoCircle"></ion-icon>
        </a>
        <ion-list lines="full" class="ion-no-margin cslistbottom">
          <ion-item class="summarycs">
            <ion-label>Hatchery</ion-label>
            <ion-select placeholder="Select One" :value="hatchery" v-model="hatchery" @ionChange="autoList(hatchery)">
              <ion-select-option value="Subang">Subang</ion-select-option>
              <ion-select-option value="Purwakarta">Purwakarta</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
        <ion-list v-if="lengthlist==0" lines="full" class="ion-no-margin cslisttop text-centercs">
          <p class="dangercs mtlistnotfound">Data Not Found</p>
        </ion-list>
        <ion-list v-else lines="full" class="ion-no-margin cslisttop">
          <ion-item v-for="listitem in listhistory" :key="listitem.key" @click="detail(listitem.qrcode)">
            <ion-label>
              <h4>{{ listitem.namapanel }} /  {{ listitem.nopanel }} / {{ listitem.hatchery }}</h4>
              <p>Update : {{ listitem.update }}</p>
              <p>Oleh : {{ listitem.email }}, Date : {{ listitem.date }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonCol, IonRow, IonIcon, IonLoading, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonSelectOption, IonSelect } from '@ionic/vue';
import { arrowUndoCircle } from 'ionicons/icons';
// import { Camera } from 'ionic-native';
// import { useRouter } from 'vue-router';
import firebase from '../config/';

export default  {
  name: 'List',
  components: { IonPage, IonCol, IonRow, IonIcon, IonLoading, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonSelectOption, IonSelect },
  data() {
    return {
      constloading : true,
      listhistory: null,
      lengthlist : 0,
      good : null,
      med : null,
      poor : null,
      datadetail : null,
      hatchery : 'Purwakarta',
      history: null,
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.autoList(this.hatchery);
      } else {
        this.constloading = false;
      }
    });
  },
  methods : {
    autoList : async function (hatchery) {
      this.constloading = true;
      await firebase.database().ref('/log/').orderByChild('hatchery').equalTo(hatchery).once('value', (snapshot) => {
        const listx = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const temp = {
            qrcode : childData.qrcode,
            key : childKey,
            hatchery : childData.hatchery,
            nopanel : childData.nopanel,
            namapanel : childData.namapanel,
            time : childData.time,
            date : childData.date,
            schedule : childData.schedule,
            email : childData.email,
            update : childData.update,
          };
          listx.push(temp);
        })
        this.listhistory = listx;
        this.constloading = false;
        this.lengthlist = listx.length;
      })
    },
    detail : async function (qrcode) {
      this.constloading = true;
      await firebase.database().ref('/datapanel').orderByChild('qrcode').equalTo(qrcode).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.datadetail = childSnapshot.val();
        });
      });
      await firebase.database().ref('/log').orderByChild('qrcode').equalTo(qrcode).once('value').then((snapshot) => {
        this.history = snapshot.val();
      });
      this.constloading = false;
    },
    backtolist : function () {
      this.datadetail = null;
    }
  },
  setup(){
    return {
      arrowUndoCircle
    }
  }
}
</script>