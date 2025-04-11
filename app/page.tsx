import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";

export default function Home() {
  return (
    <>
      <PageLayout>
        <section>
          <PageTitle
            pageTitle="Home Page"
            pageSubtitle="This is a test homepage"
          />
        </section>
      </PageLayout>
    </>
  );
}
