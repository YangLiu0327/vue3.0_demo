<template>
    <div class="fundlist">

    </div>
</template>

<script>
export default {
    name: 'fundlist-component',
    components: {},
    data(){
        return {
            tableData: []
        };
    },
    created(){
        this.getProfile();
    },
    methods: {
        getProfile() {
            //get profile data
            this.$axios.get('/api/profiles')
            .then(res => {
                console.log(res, 'res')
            }).catch(err => console.log(err))
        }
    }
};
</script>
<style scoped>
.fundlist{
    position: relative;
    height: auto;
    width: 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>