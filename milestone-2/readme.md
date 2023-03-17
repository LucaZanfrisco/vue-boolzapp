# BoolzApp

## Milestone 2

- **Visualizzazione dinamica dei messaggi:** tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
- **Click sul contatto:** mostra la conversazione del contatto cliccato

---

# Procedimento

## Visualizzazione dinamica dei messaggi:

- Aggiunta della direttiva v-for all'elemento della lista dei contatti
- Selezione del messaggio all'interno della lista in base al contatto
- Se il messaggio è stato inviato far si che venga aggiunta la classe 'sent' al medesimo messaggio
- Altrimenti aggiungere la classe 'recived'

## Click sul contatto:

- aggiungere un evento di click al alla lista dei contatti
- prendere il contatto cliccato 
- mostrare la chat in base al contatto cliccato
