<template>
    <div class="comment-component">
        <form action="#" v-on:submit.prevent="save" method="post">
            <div class="form-group">
                <label for="description" class="control-label">Comment</label>
                <textarea v-model="payload.description" id="description" rows="2" class="form-control"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success">save</button>
            </div>
        </form>

        <div class="static-comments">
            <div class="comment" v-for="comment in comments">
                <h3>{{ comment.user.name}} <span>at {{ comment.created_at}}</span></h3>
                <p>{{ comment.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        props: ["save_url", "inquiry_id", "load_comment_url"],
        data() {
            return {
                comments: [],
                payload: {}
            }
        },
        mounted() {
            axios.get(this.load_comment_url).then(response => {
                this.comments = response.data.resources;
            });
        },
        methods: {
            save() {
                if (this.payload.description == "") return;

                this.payload.inquiry_id = this.inquiry_id;

                axios.post(this.save_url, this.payload)
                    .then(response => {
                        this.payload.description = "";
                        this.comments.push(response.data.resource);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
        }
    }
</script>

<style scoped>
    .comment {
        margin: 10px 0px;
    }
</style>