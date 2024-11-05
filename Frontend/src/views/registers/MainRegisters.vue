<template>
    <div class="container-fluid">
        <table class="table table-hover">
           <thead>
            <tr>
                <th>Nombre completo</th>
                <th>Accion</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
           </thead>
           <tbody>
                <tr v-for="item in displayRegisters">
                    <td>{{ item.name}} {{item.lastName }}</td>
                    <td>{{ item.accesso }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.hour }}</td>
                </tr>
           </tbody> 
        </table>
    </div>
</template>
<script>
import registersService from '../../services/resgitersService';
export default {
    data() {
        return {
            registers:[]
        }
    },
    mounted() {
        this.getAllRegisters()
    },
    methods: {
        getAllRegisters() {
            registersService.all().then(res => this.registers = res.Registers)
        }
    },
    computed: {
        displayRegisters() {
            return this.registers
        }
    }
}
</script>