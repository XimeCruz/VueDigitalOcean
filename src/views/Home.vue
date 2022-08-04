<template>
    <v-container>
        <v-row>
            <v-col v-for="event in events" v-bind:key="event.id" cols="12" sm="6" xl="3" lg="4" md="6" class="mb-6">
                <v-card
                    class="mx-auto"
                    elevation="0"
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                        {{event.nombre}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-caption">{{(new Date(event.fechas[0].inicio_evento)).toLocaleString()}} </v-list-item-subtitle>
                        <!--v-list-item-content class="text-body-2">{{event.eventType.value}}</v-list-item-content-->
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                    >
                    <v-img :src="''+event.imagen_home"></v-img>
                    </v-list-item-avatar>
                    </v-list-item>
                    <v-btn
                        color="primary"
                        v-on:click="accept(event.id)"
                        elevation="0"
                        text
                        class="accept-button"
                    >
                        Vender Tickets
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import router from '../router';
const URI = 'https://superticket-api-4rp34.ondigitalocean.app/eventos/';
export default {
    created(){
        this.getEvents();
    },
    
  data: () => ({
    events:[],
    idEvent:0
  }),
  methods:{
    async getEvents(){
        const response = await fetch(URI);
        const data = await response.json();
        console.log(data[0].fechas[0].inicio_evento);
        const dateString = new Date(data[0].fechas[0].inicio_evento);
        //const changedDate = dateString.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5');
        //var date = new Date(changedDate);
        //console.log(date.getTime());
        console.log(dateString.toLocaleString());
        //const response = await fetch(URI);
        //console.log(response);
        //const data = await response.json();
        //console.log(data);
        this.events = data;
        
        
        //this.events = data.content;
        //console.log(events);
        
    },

    getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed();
        },
    accept: function(event_id){
        //router.push({path:'ticket'})
        //router.push({ name: 'Ticket', params: { id: ticket_id } })  router
        //router.push({ name: 'Ticket', params: { id: event_id, ticket: new TicketModel(event_id,'Kalamarka','dddd',[30,45,50]) }})
        router.push({ name: 'Prices', params: { id: event_id}})
        }
  }

}
</script>
<style lang="sass">
@import "@/styles/home/_home.sass"  
</style>