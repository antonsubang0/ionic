<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 3</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 3</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button color="primary" @click="scan">Primary</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export default  {
  name: 'Tab3',
  components: { IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  methods : {
    scan : () => {
      BarcodeScanner.scan().then((res) => {
        console.log(res);
      })
    },
  }
}
</script>