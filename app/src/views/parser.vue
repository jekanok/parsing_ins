<template>
  <div class="container">
    <form>
      <div class="form-group">
        <label for="url">Ссылка на статью</label>
        <input
          type="text"
          name="url"
          v-model="url"
          class="form-control"
          id="url"
          placeholder="url adress"
        />
      </div>
      <input type="submit" value="Парсить страницу" class="btn btn-outline-primary" @click="pars" />
    </form>
    <ul>
      <!-- <li v-for="(item, index) in  result" :key="index">{{item}}</li> -->
      <li>{{result}}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "",
      result: null
    };
  },
  methods: {
    pars(e) {
      e.preventDefault();
      const url = { url: this.url };

      axios({
        url: "http://localhost:3000/articles",
        method: "post",
        data: url
      }).then(respons => {
        console.log(respons);
        this.result = respons.data;
      });
    }
  }
};
</script>
<style scoped>
</style>
