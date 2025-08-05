<template>
  <div class="card">
    <div class="header">
      <h2>Change Moves</h2>
      <div class="select">
        <label for="day">Select Day</label>
        <select id="day" v-model="selectedDay">
          <option value="All">All</option>
          <!-- Puedes añadir más días si los quieres -->
        </select>
      </div>
    </div>

    <p class="subtitle">Describe stats and data explorer</p>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th v-for="(col, index) in columns" :key="index">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowKey) in datos" :key="rowKey">
            <td><strong>{{ rowKey }}</strong></td>
            <td v-for="col in columns" :key="col">{{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="explore">
      ▾ Explore data
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const datos = ref({})
const columns = ref([])
const selectedDay = ref('All') // Por ahora estático, se puede usar para filtrar

onMounted(async () => {
  const res = await fetch('/changeMoves.json')
  const json = await res.json()
  datos.value = json
  columns.value = Object.keys(Object.values(json)[0])
})
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 24px;
  max-width: 800px;
  margin: auto;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select {
  display: flex;
  flex-direction: column;
}

.subtitle {
  color: #666;
  margin-top: 8px;
  margin-bottom: 16px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: center;
}

th {
  background-color: #f3f7fb;
}

.explore {
  width: 100%;
  background: #f1f1f1;
  border: none;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
}
</style>
