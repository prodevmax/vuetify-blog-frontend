<template>
  <v-data-table
    :headers="headers"
    :items="articles"
    :pagination.sync="pagination"
    item-key="id"
    class="elevation-1"
  >
    <template 
      slot="items" 
      slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.title }}</td>
      <td class="text-xs-left">{{ props.item.author }}</td>
      <td class="text-xs-left">
        <v-icon 
          v-if="props.item.active "
          color="green"
          small
        >
          check_circle
        </v-icon>
        <v-icon 
          v-else
          color="red"
          small
        >
          block
        </v-icon>
      </td>
      <td class="justify-center layout px-0">
        <v-icon
          small
          class="mr-2"
          @click="viewItem(props.item.id)"
        >
          visibility
        </v-icon>
        <v-icon
          small
          @click="editItem(props.item.id)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(props.item.id)"
        >
          delete
        </v-icon>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    props: [
      'articles'
    ],
    data: () => ({
        pagination: {
          sortBy: 'id'
        },
        headers: [
          {
            text: 'ID',
            align: 'left',
            value: 'id'
          },
          { text: 'Title', value: 'title' },
          { text: 'Author', value: 'author' },
          { text: 'Status', value: 'active' },
        ]
    }),
    methods: {
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      deleteItem (id) {
        if(!confirm('Are you sure you want to delete this item?')) return
        this.$store.dispatch('article/destroy', id)
      },
      editItem (id) {
        this.$router.push({
          name: 'article.edit',
          params: {
              id: id
          } 
        })
      },
      viewItem (id) {
        this.$router.push({
          name: 'article.view',
          params: {
              id: id
          } 
        })
      }
    }
  }
</script>
