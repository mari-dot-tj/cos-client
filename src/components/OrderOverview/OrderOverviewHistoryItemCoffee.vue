<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                {{quantity}} x
            </v-col>
            <v-col cols="3">
                {{size}}
            </v-col>
            <v-col cols="3">
                {{name}}
            </v-col>
            <v-col cols="3">
                {{groundLevel}}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'OrderOverviewHistoryItemCoffee',
    props: {
        name: {
            type: String
        },
        groundLevel: {
            type: String
        },
        size: {
            type: String
        },
        quantity: {
            type: Number
        }
    }
}
</script>