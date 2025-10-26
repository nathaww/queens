

const Footer = (): React.ReactElement => {

  return (
    <footer className="w-full bg-secondary text-white">
      <div className="max-w-[1440px] mx-auto px-6 py-32">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <p className="text-6xl font-suisse-mono max-w-xl">Let&apos;s Discuss details</p>
            <div className="w-full grid md:grid-cols-3 text-white/70 font-suisse-mono gap-4 uppercase">
              <div className="flex flex-col">
                <span>Location</span>
                <span>Bole</span>
              </div>
              <div className="flex flex-col">
                <span>Phone</span>
                <span>+251 11 123 4567</span>
              </div>
              <div className="flex flex-col">
                <span>Email</span>
                <span>info@queensbridal.com</span>
              </div>
            </div>
            <div className="grid grid-cols-5 text-white/70 underline underline-offset-2 font-suisse-mono uppercase">
              <span>Facebook</span>
              <span>Linkedin</span>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>Tiktok</span>
            </div>
          </div>

          <div>
            {/* left content */}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;