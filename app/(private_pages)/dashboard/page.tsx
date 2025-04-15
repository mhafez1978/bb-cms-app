import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PageLayout from "@/components/page-layout";
import PageTitle from "@/components/tailgrids/page-title/page-title";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import PasswordReset from "@/components/admin/PasswordReset";
import CreateModel from "@/components/admin/CreateModel";
import CompanySetup from "@/components/company/CompanySetup";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    console.warn("⛔ Redirecting: No session found");
    redirect("/auth/login");
  }
  if (session.user.role) {
    console.log(session.user.role);
  }
  return (
    <PageLayout>
      <div className="min-h-[40px] w-full"></div>
      <PageTitle
        pageTitle="Dashboard Page"
        pageSubtitle="This is a test Dashboard"
      />
      {session.user.role === "SUPER_ADMIN" && (
        <>
          <div className="min-h-[100px] w-full"></div>
          <PasswordReset />
          <div className="min-h-[100px] w-full"></div>
          <ClientDashboard user={session.user} />
          <CreateModel />
        </>
      )}
      {session.user.role === "ADMIN" && (
        <>
          <div className="min-h-[72vh] py-10 px-10">
            <h3>Welcome, to BB CMS</h3>
            <CompanySetup />
          </div>
        </>
      )}
      {session.user.role === "USER" && (
        <>
          <div className="min-h-[72vh]">
            <h1>You&apos;re a member of a copmany</h1>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Page;
