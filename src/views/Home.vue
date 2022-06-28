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
                        {{event.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-caption">{{event.saleEnd}} - {{event.city.value}}</v-list-item-subtitle>
                        <v-list-item-content class="text-body-2">{{event.eventType .value}}</v-list-item-content>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                    >
                    <v-img :src="''+event.homeImage"></v-img>
                    </v-list-item-avatar>
                    </v-list-item>
                    <v-btn
                        color="primary"
                        v-on:click="accept(event.id)"
                        elevation="0"
                        text
                        class="accept-button"
                    >
                        Comprar Tickets
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import TicketModel from '../models/TicketModel';
import router from '../router';
const URI = 'https://api.superticket.live/api/portal/events';
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
        console.log(data.content[0].name);
        this.events = data.content;
    },

    getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min).toFixed();
        },
    accept: function(ticket_id){
        //router.push({path:'ticket'})
        //router.push({ name: 'Ticket', params: { id: ticket_id } })  router
        router.push({ name: 'Ticket', params: { id: ticket_id, ticket: new TicketModel(ticket_id,'Kalamarka','dddd',[30,45,50]) }})
        }
  }

}
</script>
<style lang="sass">
@import "@/styles/home/_home.sass"  
</style>