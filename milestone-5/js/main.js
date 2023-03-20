"use strict";

const { createApp } = Vue;

createApp({
  data() {
    return {
      newMessage: '',
      answerMessage: 'Ok',
      answerTimer: 2,
      userSelected: 0,
      contactSearch: '',
      messageSelected: null,
      showTentBox: false,
      messageLength: 0,
      listaContatti: [],
      dateTime: luxon.DateTime,
      orario: '',
      contacts: [
        {
          name: "Michele",
          avatar: "../img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: true,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: true,
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: false,
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "../img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: true,
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: false,
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: true,
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "../img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: false,
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: true,
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: false,
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "../img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: true,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: false,
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "../img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: true,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: false,
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "../img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: true,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: false,
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: true,
            },
          ],
        },
        {
          name: "Federico",
          avatar: "../img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: true,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: false,
            },
          ],
        },
        {
          name: "Davide",
          avatar: "../img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: false,
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: true,
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: false,
            },
          ],
        },
      ],
    };
  },
  methods:{
    // Metodo che seleziona l'utente dalla lista contatti
    userSelect(index){
      console.log(this.userSelected);
      this.userSelected = index;
    },
    // Aggiunge il colore di sfondo al contatto selezionato
    isSelected(index){
      if(this.userSelected === index){
        return true;
      }
      return false;
    },
    // Formatta la data in ore e minuti
    ora(date){
      const dateFormat = this.dateTime.fromFormat(date, 'dd/MM/yyyy H:mm:ss' );
      const ore = dateFormat.hour;
      const minuti = dateFormat.minute;
      return `${ore}:${minuti}`;
    },
    // Permette di scrivere un messaggio con ore e minuti dinamici e di ricevere una risposta entro 1 secondo
    newMsg(){
      if(this.newMessage.trim() !== ''){
        const oggi = this.dateTime.now();
        this.orario = oggi.toFormat('dd/MM/yyyy H:mm:ss')
        let { date, message,status} = this.listaContatti[this.userSelected].messages;
        message = this.newMessage;
        status = true;
        date = this.orario;
        this.listaContatti[this.userSelected].messages.push({
          date,
          message,
          status,
        })
        }
        this.newMessage = '';
        setTimeout(() => {
          let { date, message,status} = this.listaContatti[this.userSelected].messages;
          message = this.answerMessage;
          status = false;
          date = this.orario;
          this.listaContatti[this.userSelected].messages.push({
            date,
            message,
            status
          });
        }, this.answerTimer * 1000);
    },
    // Cerca nella lista contatti generando una nuova lista dei contatti trovati
    findContact(){
      if(this.contactSearch.trim() !== ''){
        this.listaContatti = this.contacts.filter(element => element.name.toLowerCase().includes(this.contactSearch.toLowerCase()));
      }else{
        this.listaContatti = this.contacts;
      }
    },
    //  Tendina la messaggio selezionato
    tentBox(index){
      this.messageSelected = index;
      if(!this.showTentBox){
        this.showTentBox = true;
      }else{
        this.showTentBox = false;
      }
    },
    // Aggiunge la classe show alla tendina del messaggio selezionato
    tentBoxShow(index){
      if(this.messageSelected === index && !this.showTentBox){
        return true;
      }
        return false;
    },
    //  Cancella il messaggio selezionato
    deleteMessage(index){
      this.listaContatti[this.userSelected].messages.splice(index,1);
    },
  },
  // Monta all'interno dell'istanza dell'app la lista dei contatti cercati
  mounted(){
    this.listaContatti = this.contacts;
  }
}).mount('#app');
