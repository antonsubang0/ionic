<template>
  <ion-page>
    <div class="cvch">
      <div class="aboutcs centercs">
        <a class="backhomecs" href="/">
          <ion-icon :icon="arrowUndoCircle"></ion-icon>
        </a>
        <h3 class="bolder">List Panel</h3>
        <div class="aboutimg">
          <img class="sizeaboutimg" src="../../public/assets/cpi.jpg">
        </div>
        <h4>Thanks for Subang Teams</h4>
        <h6 class="aboutcs">Report Bug, send email to antoni_us3@yahoo.com </h6>
      </div>
    </div>
  </ion-page>
</template>
<style>
  .aboutcs {
    text-align: center;
    margin: auto;
  }
  .bolder {
    font-weight: bold;
    width: 100%;
  }
  .aboutimg {
    width: 100%;
    display: block;
    text-align: center;
  }
  .sizeaboutimg{
    width: 50%;
  }
  p.aboutcs {
    font-weight: normal;
  }
</style>
<script>
import { IonPage } from '@ionic/vue';
import { arrowUndoCircle } from 'ionicons/icons';
import firebase from '../config/';

export default  {
  name: 'Tab1',
  components: { IonPage },
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
      arrowUndoCircle
    }
  }
}
</script>