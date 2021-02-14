<template>
  <ion-page>
    <ion-loading
    :is-open="constloading"
    cssClass="loadingcs"
    message="Please wait...">
  </ion-loading>
    <ion-tabs>
    </ion-tabs>
  </ion-page>
</template>
<style>
  .cvchxx {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  .wid100 {
    width: 100%;
  }
  h6.scandetail {
    padding-left: 15px;
    text-decoration: underline;
    font-size: 18px;
    margin-bottom: 0;
    font-weight: bold;
  }
  .scaned {
    color: #555;
    font-size: 16px;
  }
  a.backhomecs {
    position: fixed;
    bottom: 25px;
    right: 25px;
    font-size: 35px;
    color: #99f;
    z-index: 3;
    background-color: #eee;
    height: 35px;
    border-radius: 50%;
  }
  .bordersumarrycs {
    position: absolute;
    top: 88px;
    z-index: 10;
    right: 15px;
    background-color: #ddd;
    padding: 3px 15px;
    border-radius: 3px;
  }
  p.detaillist {
    margin-top: 0px;
    margin-bottom: 5px;
    color: #555;
    font-size: 15px;
  }
  .mtlistnotfound {
    margin-top: 100px;
  }
  .parentlist {
    position: relative;
    border-top: 1px solid #eee;
    padding-top: 8px;
  }
  .backtolist {
    position: absolute;
    right: 20px;
    font-size: 35px;
    top: -18px;
    color: #99f;
    z-index: 3;
    background-color: #eee;
    height: 35px;
    border-radius: 50%;
  }

  h5.detaillist {
    margin-top: 0!important;
    margin-bottom: 5px;
    font-size: 18px;
    text-decoration: underline;
    text-align: center;
    font-weight: bold;
  }
  h6.detaillist {
    margin-top: 5px;
    margin-bottom: 5px;
    text-decoration: underline;
    font-weight: bold;
  }
  .detailrow {
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: 1px solid #eee;
  }
  .detaillist {
    margin-top: 40px;
    padding-right: 5px;
  }
  .summarycs {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;
    position: relative;
  }
  .dangercs {
    color: #dc3545;
  }
  .cslistbottom {
    padding-bottom: 0;
  }
  .cslisttop {
    padding-top: 0;
  }
  .successcs {
    color: #19ee54;
  }
  .warningcs {
    color: #ffc107;
  }
  .text-centercs {
    text-align: center;
  }
  img.logoicon {
    display: inline-block;
    height: 30px;
    margin-left: 15px;
  }
  ion-title.md.title-default.hydrated {
    display: inline-block;
  }
  .imagedetail {
    height: 150px;
    text-align: center;
    position: relative;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #888;
  }
  .imagecreate {
    height: 150px;
    text-align: center;
    position: relative;
  }
  .imagecreate:before {
    content: 'x';
    position: absolute;
    background-color: rgba(0,0,0, 0.3);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    color: white;
    margin-top: 55px;
    margin-left: -17px;
    font-size: 1.5rem;
    border: 2px solid white;
    z-index: 10;
  }
  .pickphoto {
    margin: 20px;
    height: 70%;
    border: 1px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }
  ion-item {
    --highlight-color-focused : green;
  }
  .inputtext {
    padding-right: 17px!important;
  }
  .label-fixed.sc-ion-label-md-h {
    min-width: 130px;
  } 
  .textright {
    text-align: right;
  }

  .textleft {
    text-align: left;
  }
  .mriconcs {
    margin-right: 10px;
    color: green;
  }
  .anchorcs {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }
  .cvch {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .centerbarcode {
    text-align: center;
    margin-top: 10px;
  }
  .centercs{
    text-align: center;
    font-size: 1.2rem!important;
    font-weight: bold;
  }
  .centercs.mbcs {
    margin-bottom: 20px;
  }
  .logincs.mtcs {
    margin-top: 20px;
  }
</style>
<script>
import { IonTabs, IonPage, IonLoading } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
import firebase from '../config/';
import { LocalNotifications } from '@ionic-native/local-notifications';


export default {
  name: 'Tabs',
  components: { IonTabs, IonPage, IonLoading },
  data () {
    return {
      constloading : true,
    }
  },
  mounted () {
    this.unload();
    this.schedule();
  },
  methods : {
    unload : async function () {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.constloading = false;
        } else {
          this.constloading = false;
          window.location.href="/login/";
        }
      });
    },
    schedule : function () {
      LocalNotifications.schedule({
        title: 'List Panel',
        text: 'Check schedule on the ListPanel',
        trigger: { every: { hour: 6, minute: 10 } },
        smallIcon: 'res://ic_launcher.png',
        icon: 'res://ic_launcher.png',
      });
    }
  },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  },
}
</script>