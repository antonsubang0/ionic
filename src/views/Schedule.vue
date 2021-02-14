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
        <ion-title>Schedule</ion-title>
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
        <div>
          <div class="text-centercs">
            <h6 class="navigasisch"><span class="successcs sttdate">{{ hdate }}</span><span class="radcs" @click="minusSatu"><ion-icon :icon="arrowBackOutline"></ion-icon></span><span class="radcs" @click="plusSatu"><ion-icon :icon="arrowForwardOutline"></ion-icon></span></h6>
          </div>
          <ion-list lines="full" class="ion-no-margin cslistbottom">
            <ion-item class="summarycs">
              <ion-label>Hatchery</ion-label>
              <ion-select placeholder="Select One" :value="hatchery" v-model="hatchery" @ionChange="autoList(hatchery)">
                <ion-select-option v-for="listh in listhatchery" :key="listh.id" :value="listh.nama">{{ listh.nama }}</ion-select-option>
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
                <p>Last Update : {{ listitem.date }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<style>
  .navigasisch {
    position: fixed;
    top: 88px;
    right: 20px;
    font-size: 20px;
    z-index: 10;
    color: #fff;
    text-align: center;
  }
  span.radcs {
    padding: 8px 5px 3px 5px;
    position: relative;
    border-radius: 50%;
    margin-left: 10px;
    background-color: #777;
    cursor: pointer;
  }
  .sttdate {
    font-size: 12px;
    margin-left: 6px;
    background-color: #777;
    padding: 5px;
    width: 78px;
    border-radius: 10px;
    position: absolute;
    top: 40px;
  }
</style>
<script>
import { IonPage, IonCol, IonRow, IonIcon, IonLoading, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonSelectOption, IonSelect } from '@ionic/vue';
import { arrowUndoCircle, arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
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
      hatchery : null,
      history: null,
      sdate : null,
      hdate : null,
      sttdate : 0,
      listhatchery : null,
    }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.allhatchery();
      } else {
        this.constloading = false;
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
        this.autoList(this.hatchery);
      });
    },
    autoList : async function (hatchery) {
      this.constloading = true;
      this.sdate = new Date();
      this.sdate.setDate(this.sdate.getDate() + this.sttdate);
      this.hdate = this.formattgl(this.sdate);
      await firebase.database().ref('/datapanel/').orderByChild('hatchery').equalTo(hatchery).once('value', (snapshot) => {
        const listx = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (this.hdate == childData.schedule) {
            const temp = {
              key : childKey,
              qrcode : childData.qrcode,
              hatchery : childData.hatchery,
              nopanel : childData.nopanel,
              namapanel : childData.namapanel,
              elcb : childData.elcb,
              arrester : childData.arrester,
              grounding : childData.grounding,
              time : childData.time,
              date : this.formattgl(childData.date),
              schedule : childData.schedule,
              description : childData.description,
              urlImage : childData.urlImage,
              rating : childData.rating,
            };
            listx.push(temp);
          }
        })
        this.listhistory = listx;
        this.constloading = false;
        this.lengthlist = listx.length;
      })
    },
    detail : async function (qrcode) {
      this.constloading = true;
      await firebase.database().ref('/datapanel/').orderByChild('qrcode').equalTo(qrcode).once('value').then((snapshot) => {
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
    },
    formattgl : function (data) {
      const newdate = new Date(data);
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const bln = newdate.getMonth();
      const bln1 = months[bln];
      const tgl = newdate.getDate();
      const thn = newdate.getFullYear().toString().substr(-2);
      const tglfull = tgl + ' ' + bln1 + ' ' + thn;
      return tglfull;
    },
    plusSatu : function () {
      this.sttdate += 1;
      this.autoList(this.hatchery);
    },
    minusSatu : function () {
      this.sttdate -= 1;
      this.autoList(this.hatchery);
    }
  },
  setup(){
    return {
      arrowUndoCircle,
      arrowBackOutline, 
      arrowForwardOutline
    }
  }
}
</script>