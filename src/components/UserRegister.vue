<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <div>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Full name"
          required
        ></v-text-field>
      </div>

      <div>
        <v-autocomplete
          v-model="country"
          :rules="countryRules"
          :items="items"
          :loading="loading"
          :search-input.sync="search"
          label="Country"
          required
          hide-no-data
          hide-selected
          item-text="name"
          item-value="idd"
          cache-items
          @change="selectCountry"
          return-object
        >
          <template v-slot:selection="data">
            <v-avatar left>
              {{ data.item.flag }}
            </v-avatar>
            {{ data.item.name }}
          </template>

          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                {{ data.item.flag }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </div>

      <div>
        <v-text-field
          v-model="phoneNumber"
          :rules="phoneNumberRules"
          label="Phone number"
          :prefix="prefix"
          required
        ></v-text-field>
      </div>

      <div>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </div>

      <div>
        <v-btn
          :disabled="!valid"
          color="primary"
          elevation="2"
          @click="validate"
          >Submit</v-btn
        >
      </div>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegister",

  data: () => ({
    valid: false,
    name: "",
    nameRules: [
      (v) => !!v || "Full name is required",
      (v) => (v && v.length > 3) || "Name must be more than 3 characters",
    ],
    country: "",
    countryRules: [(v) => !!v || "Country is required"],

    prefix: "",
    // variableWithMask: "####-##",

    phoneNumber: "",
    phoneNumberRules: [
      (v) => !!v || "Phone number is required",
      (v) =>
        (v && v.length > 3) || "Phone number must be more than 3 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    loading: false,
    items: [],

    search: null,
    select: null,
  }),

  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },

  methods: {
    async querySelections(v) {
      this.loading = true;

      console.log(v);

      const response = await axios
        // .get("http://localhost:8000/storage/countries.json", {
        //   headers: {
        //     withCredentials: false,
        //   },
        // })
        .get("./countries.json")
        .then((response) => response.data);

      this.items = response;

      this.loading = false;
    },
    async validate() {
      this.$refs.form.validate();

      try {
        const response = await axios
          .post("http://localhost:8000/api/register", {
            name: this.name,
            phone_number: this.phoneNumber,
            country: this.country?.name,
            email: this.email,
          })
          .then((response) => response.data);

        alert("User #" + response.id + " registered");
      } catch (error) {
        console.log(error);

        if (error?.response?.data?.message) {
          alert(error?.response?.data?.message);
        } else {
          alert("Something got wrong");
        }
      }
    },
    selectCountry(item) {
      this.prefix = item ? item.idd : "";
    },
  },
};
</script>
