<template>
  <v-container class="report-container">
    <v-row>
      <v-col class="report-col" cols="12"><p class="text-2xl mb-6">보고서</p></v-col>
      <v-col class="report-col">
          <v-btn color="primary" class="me-n3 mt-n1" @click="downloadpdf()">다운로드</v-btn>
      </v-col>
      </v-row>
    <v-row>
     <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="1400"
      filename="hee hee"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"

      @progress="onProgress($event)"
      @hasStartedGeneration="hasStartedGeneration()"
      @hasGenerated="hasGenerated($event)"
      ref="html2Pdf"
    >
      <pdf-content class="main-content" slot="pdf-content" />
    </vue-html2pdf>
    </v-row>
  </v-container>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import PdfContent from "@/views/report/PdfContent";
export default {
  components: {
    VueHtml2pdf,
    PdfContent
  },
  props : [],
  data(){
    return {
      contentRendered: false,
      progress: 0,
      generatingPdf: false,
      pdfDownloaded: false,
    }
  },
  computed : {
  },
  methods : {
    async downloadpdf(){
      this.$refs.html2Pdf.generatePdf();
    },
    async beforeDownload ({ html2pdf, options, pdfContent }) {
        await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
            const totalPages = pdf.internal.getNumberOfPages()
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i)
                pdf.setFontSize(10)
                pdf.setTextColor(150)
                pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
            } 
        }).save()
    },

  },
  mounted(){
  }
}

</script>

<style lang="scss">
.report-container{
  .report-col{
    padding : 0;
  }
  .main-content{
    margin : 0 auto;
  }
  
  .title-container {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  .title-header {
    color: #fff;
    padding: 25px 50px;
    border: 5px solid #fff;
    border-radius: 5px;
    opacity: 0;
  }
}
</style>
