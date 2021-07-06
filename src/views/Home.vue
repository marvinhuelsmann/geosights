<template>
  <div class="relative bg-white overflow-hidden">
    <div class="card mt-4">
      <table class="table m-0">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="{ id, name, email } in users" :key="id">
          <td>{{ name }}</td>
          <td>{{ email }}</td>
          <td>
            <router-link :to="`/edit/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Edit
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteUser(id)">
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="card card-body mt-4">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label>Name</label>
          <input v-model="form.name" class="form-control" required />
        </div>

        <div class="form-group mt-3">
          <label>Email</label>
          <input
              v-model="form.email"
              class="form-control"
              type="email"
              required
          />
        </div>

        <button type="submit" class="btn btn-success mt-3">
          Create User
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoadUsers, deleteUser, createUser} from "../../firebase";
import { reactive } from 'vue'

export default {
  setup() {
    const users = useLoadUsers()
    const form = reactive({ name: '', email: '' })
    const onSubmit = async () => {
      await createUser({ ...form })
      form.name = ''
      form.email = ''
    }

    return {
      users, deleteUser, form, onSubmit
    }
  },
  methods: {
    sendUser() {

    }
  }
}
</script>
