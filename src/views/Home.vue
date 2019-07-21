<template>
  <v-container class="pt-5 pb-5 mb-5">
    <v-text-field
      color="black"
      @keyup.enter.native="createItem()"
      v-model="item"
      label="Lägg till"
      style="width: 70%; margin: 0 auto;"
      class="pb-2"
    ></v-text-field>
    <v-list
      v-if="items.length !== 0"
      two-line
      style="border-radius: 10px; width: 90%; margin: 0 auto;"
    >
      <template v-for="(item, index) in items">
        <v-list-tile class="test" :key="item.title" avatar @click>
          <v-list-tile-content>
            <v-list-tile-title style="text-transform:capitalize;" class="title">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <v-icon color="white" large @click="deleteItem(item.title, index)">{{item.icon}}</v-icon>
          </v-list-tile-avatar>
        </v-list-tile>
        <v-divider
          v-if="index !== items.length-1"
          color="grey"
          style="width: 90%; margin: 0 auto;"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import db from "../js/firebase";

export default {
  data() {
    return {
      item: "",
      items: []
    };
  },
  methods: {
    getItems() {
      db.collection("Groceries")
        .get()
        .then(snapshot => {
          snapshot.forEach(item => {
            this.items.push(item.data());
          });
        });
    },
    createItem() {
      const grocery = this.item.toLowerCase();
      this.item = "";
      db.collection("Groceries")
        .doc(grocery)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log(`${grocery} is already in your list`);
          } else {
            db.collection("Groceries")
              .doc(grocery)
              .set({ title: grocery, icon: "check_circle_outline" });
            this.items.push({ title: grocery, icon: "check_circle_outline" });
          }
        });
    },
    deleteItem(e, x) {
      db.collection("Groceries")
        .doc(e)
        .delete();
      this.items.splice(x, 1);
    }
  },
  created() {
    this.getItems();
    window.addEventListener("load", function() {
      setTimeout(function() {
        // This hides the address bar:
        window.scrollTo(0, 1);
      }, 0);
    });
  }
};
</script>
<style>
.test,
div .v-list {
  background: #121f2d !important;
  color: white;
}
.v-parallax__image {
  transform: none !important;
  height: 100% !important;
}
</style>
