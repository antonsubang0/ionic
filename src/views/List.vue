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
        <ion-title>List Panel</ion-title>
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
              <h5 class="detaillist">{{datadetail.namapanel }} / {{datadetail.nopanel }}</h5>
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
            <h6 class="bordersumarrycs">Sumarry : G : <span class="successcs">{{ good }}</span>, M : <span class="warningcs">{{ med }}</span> , P : <span class="dangercs">{{ poor }}</span></h6>
          </div>
          <ion-list lines="full" class="ion-no-margin cslistbottom">
            <ion-item class="summarycs">
              <ion-label>Hatchery</ion-label>
              <ion-select placeholder="Select One" :value="hatchery" v-model="hatchery" @ionChange="autoList(hatchery)">
                <ion-select-option value="Subang">Subang</ion-select-option>
                <ion-select-option value="Purwakarta">Purwakarta</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>
        <ion-list v-if="lengthlist==0" lines="full" class="ion-no-margin cslisttop text-centercs">
          <p class="dangercs mtlistnotfound">Data Not Found</p>
        </ion-list>
        <ion-list v-else lines="full" class="ion-no-margin cslisttop">
          <ion-item v-for="listitem in listpanel" :key="listitem.key" @click="detail(listitem.key)">
            <ion-avatar slot="start">
              <img :src="listitem.urlImage">
            </ion-avatar>
            <ion-label>
              <h2>{{ listitem.namapanel }}</h2>
              <h3>{{ listitem.nopanel }} <span> {{ listitem.hatchery }} </span><span :class="{ 'successcs': listitem.rating=='Good', 'warningcs': listitem.rating=='Moderate', 'dangercs': listitem.rating=='Poor' }"> ( {{ listitem.rating }} )</span></h3>
              <p>ELCB : {{ listitem.elcb }}, Arrester : {{ listitem.arrester }}, Grouding : {{ listitem.grounding }}, Description : {{ listitem.description }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonPage, IonLoading, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonHeader, IonToolbar, IonTitle, IonCol, IonRow, IonIcon, IonSelectOption, IonSelect } from '@ionic/vue';
import { arrowUndoCircle } from 'ionicons/icons';
// import { Camera } from 'ionic-native';
// import { useRouter } from 'vue-router';
import firebase from '../config/';

export default  {
  name: 'List',
  components: { IonPage, IonLoading, IonContent, IonList, IonItem, IonLabel, IonAvatar, IonHeader, IonToolbar, IonTitle, IonCol, IonRow, IonIcon, IonSelectOption, IonSelect },
  data() {
    return {
      constloading : true,
      listpanel: null,
      lengthlist : 0,
      good : null,
      med : null,
      poor : null,
      datadetail : null,
      hatchery : 'Purwakarta',
      history : null,
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
      firebase.database().ref('/datapanel/').orderByChild('hatchery').equalTo(hatchery).once('value', (snapshot) => {
        const listx = [];
        let G = 0;
        let M = 0;
        let P = 0;
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          const temp = {
            key : childKey,
            hatchery : childData.hatchery,
            nopanel : childData.nopanel,
            namapanel : childData.namapanel,
            elcb : childData.elcb,
            arrester : childData.arrester,
            grounding : childData.grounding,
            time : childData.time,
            date : childData.date,
            schedule : childData.schedule,
            description : childData.description,
            urlImage : childData.urlImage,
            rating : childData.rating,
          };
          if (childData.rating=='Good') {
            G += 1;
          }
          if (childData.rating=='Moderate') {
            M += 1;
          }
          if (childData.rating=='Poor') {
            P += 1;
          }
          listx.push(temp);
        })
        this.listpanel = listx;
        this.good = G;
        this.med = M;
        this.poor = P;
        this.constloading = false;
        this.lengthlist = listx.length;
      })
    },
    detail : async function (evt) {
      this.constloading = true;
      await firebase.database().ref('/datapanel/' + evt).once('value').then((snapshot) => {
        this.datadetail = snapshot.val();
      });
      await firebase.database().ref('/log').orderByChild('qrcode').equalTo(this.datadetail.qrcode).once('value').then((snapshot) => {
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