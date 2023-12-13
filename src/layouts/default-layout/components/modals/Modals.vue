<template>
  <KTUpgradePlanModal />
  <KTCreateAppModal />
  <KTNewTargetModal />
  <KTViewUsersModal />
  <KTInviteFriendsModal />
  <KTDayNews />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import KTCreateAppModal from "@/components/modals/wizards/CreateAppModal.vue";
import KTNewTargetModal from "@/components/modals/forms/NewTargetModal.vue";
import KTViewUsersModal from "@/components/modals/general/ViewUsersModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import KTDayNews from "@/components/modals/dataModals/DayNews.vue";

export default defineComponent({
  name: "global-modals",
  components: {
    KTUpgradePlanModal,
    KTCreateAppModal,
    KTNewTargetModal,
    KTViewUsersModal,
    KTInviteFriendsModal,
    KTDayNews,
  },
});
</script>
