<template>
    
    <v-container>
        <v-row class="" no-gutters  justify="space-around">
            <v-col cols="10" sm="7" lg="8" xl="6" md="8">
                
                <v-card
                    class="mx-auto"
                    elevation="0"
                >
                <v-card-title class="mb-6">Selecciona el Ticket</v-card-title>
                
                        <v-combobox

                            v-model="select"
                            label="Tipo de Ticket"
                            :items="items"
                            class="mx-12 mb-6"
                            color="primary"
                            outlined
                        >
                        </v-combobox>
                
                <div v-for="post of posts" v-bind:key="post.id">
        <h5>{{post.title}}</h5>
        <p>{{post.body}}</p>
    </div>
                <v-row no-gutters align="center"
      justify="center"
                    class="mx-12 mb-6">
                    <v-col cols="12" xl="9" lg="9" md="6" sm="7">
                        <v-slider
                        v-model="count"
                        color="primary"
                        track-color="secondary"
                        label="Cantidad"
                        min="1"
                        max="10"
                        thumb-label
                        ></v-slider>
                    </v-col>
                    <v-col cols="5" xl="3" lg="3" md="6" sm="5">
                        <v-text-field
                            label="Cantidad"
                            v-model="count"
                            type="number"
                            readonly
                            placeholder="Placeholder"
                            outlined
                        ></v-text-field>
                    </v-col>
                </v-row>
                        <v-text-field
                        class="mx-12"
                            label="Precio Total"
                            :value="getTotalPrice()+' Bs.'"
                            readonly
                            placeholder="Placeholder"
                            outlined
                        ></v-text-field>
                <v-row align="center" justify="center">
                    <v-btn  class="mb-6" color="primary" v-on:click="accept">
                    Comprar
                </v-btn>
                </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

const URI = 'https://jsonplaceholder.typicode.com/posts';
export default {
    created(){
        this.getPosts();
    },

  data: () => ({
    
        select: null,
        count: 1,
        items: [
          'VIP -180 Bs',
          'Especial - 130 BS',
          'Normal - 100 BS ',
        ],
        precios:[180.0,130.0,100.0],
        posts : []
  }),
  methods:{

    async getPosts(){
        const response = await fetch(URI);
        const data = await response.json();
        console.log(data);
        this.posts = data;
    },
        
    getTotalPrice(){
        console.log("adfsdf");
        if(this.select==null){
            return 0;
        }
        var index= this.items.indexOf(this.select);
        return this.precios[index]*this.count;
    },
    accept(){
        console.log(this.select);
        console.log(this.getTotalPrice());
        if(this.select!=null &&this.getTotalPrice()!=0){
            console.log("send");
            
            window.Payment.postMessage(JSON.stringify({
                "count":this.count,
                "totalPrice":this.getTotalPrice(),
                "item":this.select
            }));
        }
    }
  }
}
</script>