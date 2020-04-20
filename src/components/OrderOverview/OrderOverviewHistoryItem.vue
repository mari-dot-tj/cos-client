<template>
    <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
            <v-row v-if="open">
                <v-col cols="4">
                    nummer
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="4">
                    nummer
                </v-col>

                <v-col cols="4">
                    dato
                </v-col>

                <v-col cols="4">
                    annet
                </v-col>
            </v-row>

        </v-expansion-panel-header>
        <v-expansion-panel-content>
            content
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
export default {
    name: 'OrderOverviewHistoryItem',
}
</script>