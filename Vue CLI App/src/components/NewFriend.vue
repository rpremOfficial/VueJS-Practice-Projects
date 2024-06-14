<template>
    <form @submit.prevent="submitData">
        <div>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="enteredName" required>
        </div>
        <div>
            <label for="phone">Phone number</label>
            <input type="text" id="phone" v-model="enteredPhone" required>
        </div>
        <div>
            <label for="email">Email address</label>
            <input type="email" id="email" v-model="enteredEmail" required>
        </div>
        <button type="submit">Add contact</button>
    </form>
</template>

<script>
export default{
    emits: [
        'add-contact'
    ],
    data(){
        return {
            enteredName: '',
            enteredPhone: '',
            enteredEmail: ''
        };
    },
    methods:{
        submitData(){
            this.$emit('add-contact', 
                this.enteredName,
                this.enteredPhone,
                this.enteredEmail
            );
        }
    }
};
</script>