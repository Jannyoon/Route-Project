/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage : {
        'banner1' : 'url("./ui/bannerImg/b1.JPG")',
        'banner2' : 'url("./ui/bannerImg/b2.JPG")',
        'banner3' : 'url("./ui/bannerImg/b3.JPG")',
      },
      colors : {
        'brand' : '#10B981',
        'fcs' : '#fdba74',
        'logout' : '#ef4444',
      },
      spacing : {
        '520':'32.5rem',
        '528':'33rem',
        '544':'34rem',
        '560':'35rem',
        '576':'36rem',
        '592':'37rem',
        '608':'38rem',
        '624':'39rem',
        '640':'40rem',
        '656':'41rem',
        '672':'42rem',
        '688':'43rem',
      }
    },
  },
  plugins: [],
}