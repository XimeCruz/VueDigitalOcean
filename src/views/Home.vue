<template>
    <v-container>
        <v-row>
            <v-col v-for="event of events" v-bind:key="event.id" cols="12" sm="6" xl="3" lg="4" md="6" class="mb-6">
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
                        <v-list-item-content class="text-body-2">{{event.eventType.value}}</v-list-item-content>
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
                        v-on:click="accept"
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
import router from '../router';
const URI = 'https://api.superticket.live/api/portal/events';
export default {
    created(){
        this.getEvents();
    },
    
  data: () => ({
    events:[
        {
            title:"Reto Extremo",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"29 de abril del 2022",
            city:"La Paz",
            type:"Deportes",
            category:"Partidos Nacionales",
            image:"https://s3.sa-east-1.amazonaws.com/superticket-bol/events/CFGVCwfzFikaSVscqwOI.png"
        },
        
        {
            title:"Proyecto Cultural Barranco",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"26 de marzo del 2022",
            city:"La Paz",
            type:"Fiestas Festivales",
            category:"Festival",
            image:"https://picsum.photos/200/300"
        },
        
        {
            title:"Reto Extremo",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"29 de abril del 2022",
            city:"La Paz",
            type:"Deportes",
            category:"Partidos Nacionales",
            image:"https://picsum.photos/",
        },
        
        
        {
            title:"Reto Extremo",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"29 de abril del 2022",
            city:"La Paz",
            type:"Deportes",
            category:"Partidos Nacionales",
            image:"https://s3.sa-east-1.amazonaws.com/superticket-bol/events/CFGVCwfzFikaSVscqwOI.png"
        },
        
        
        {
            title:"Reto Extremo",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"29 de abril del 2022",
            city:"La Paz",
            type:"Deportes",
            category:"Partidos Nacionales",
            image:"https://s3.sa-east-1.amazonaws.com/superticket-bol/events/CFGVCwfzFikaSVscqwOI.png"
        },
        
        
        {
            title:"Reto Extremo",
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquam cursus molestie. Nam nibh mauris, posuere id elit sit amet.",
            date:"29 de abril del 2022",
            city:"La Paz",
            type:"Deportes",
            category:"Partidos Nacionales",
            image:"https://s3.sa-east-1.amazonaws.com/superticket-bol/events/CFGVCwfzFikaSVscqwOI.png"
        }

        ]
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
    accept(){
        router.push({path:'ticket'})
        }
  }

}
</script>
<style lang="sass">
@import "@/styles/home/_home.sass"  
</style>