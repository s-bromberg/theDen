import { Outlet } from 'react-router';
import Header from './Header';
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';
import { Box } from '@mui/system';
import NavBar from './TopNavBar/NavBar';

function App() {
  let theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          px: { xs: 0, sm: 5, md: 7 },
        }}
      >
        <NavBar />
        <p cSpell:disable>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, ullam
          eaque optio inventore, voluptas vel eius perspiciatis, voluptatibus
          quisquam odit mollitia fugit qui! Quia ea ratione ad illo error
          tempora sit eos nam quasi non! Recusandae, aspernatur. Quia beatae hic
          commodi impedit sit illo exercitationem doloremque ullam explicabo
          accusamus id ducimus cumque aspernatur, iste quam repudiandae
          laudantium velit vel delectus perferendis ratione molestias nihil. Vel
          sunt suscipit rem aperiam cupiditate asperiores quas, quod quisquam
          dolore. Harum perferendis accusantium quia aliquid tenetur dicta,
          dolor, dolorem tempore et totam hic, itaque voluptas nulla
          consequuntur architecto possimus qui? Odit ratione sequi impedit
          nobis, voluptates neque itaque quam qui possimus repellendus autem?
          Nam sunt voluptates laudantium ullam et delectus aspernatur, nesciunt
          labore quis iusto. Cum nihil tempore laboriosam pariatur labore magni
          similique. Fugiat ipsum error, possimus porro sint vero, reprehenderit
          tempore corporis quisquam in eveniet pariatur non soluta nisi corrupti
          inventore est dolor quod. asperiores sit quos quo, ratione dicta
          recusandae alias. Fuga, esse modi. Dignissimos autem ipsum ab id
          beatae amet ducimus mollitia reprehenderit! Deserunt similique aut sit
          amet adipisci vel tempore, hic eveniet nostrum ullam omnis repellendus
          officia quas earum iusto distinctio, tempora repudiandae, officiis cum
          at? Assumenda praesentium natus maxime, mollitia ipsum incidunt!
          Commodi aut mollitia consequatur nulla beatae placeat voluptate quidem
          non recusandae tempora, consectetur quas repudiandae, saepe
          consequuntur temporibus voluptas repellendus soluta esse nam in vero
          reprehenderit itaque perspiciatis minus. Quaerat laboriosam quos et
          rem voluptatum alias officiis perferendis voluptate reiciendis dolore
          ullam doloremque consequatur, ab illum! Quaerat accusantium porro
          molestias harum. Commodi asperiores officia quos, odio deserunt
          voluptas atque quae! Voluptatum possimus reprehenderit repellat aut
          quibusdam, sit inventore ipsa, maxime est recusandae asperiores cum in
          enim, beatae nemo ducimus vel. Maxime aut consectetur ipsa laudantium
          odio ut a adipisci commodi, porro optio dolorem voluptatem eius
          quaerat, rerum asperiores quibusdam aliquam. Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Optio repellendus earum temporibus
          saepe, aperiam neque ea possimus quis, cumque, nobis reprehenderit?
          Enim adipisci porro placeat in iure minus, repudiandae, repellendus
          facilis soluta, facere explicabo voluptatum animi aperiam? Ab enim
          quibusdam veniam. Expedita possimus labore saepe tenetur repudiandae a
          ullam aperiam, fuga, sed fugit architecto soluta ducimus corporis esse
          id. Porro, doloremque distinctio mollitia officia blanditiis odit enim
          assumenda quos ipsa quisquam ratione labore velit molestias! Pariatur
          libero dicta aperiam dignissimos odio inventore est voluptates
          molestiae at maiores? Expedita rem quia, doloremque laudantium a ullam
          qui ab rerum temporibus nemo distinctio blanditiis quidem, vero
          perspiciatis fuga unde esse, inventore quasi? Saepe, expedita! Lorem
          ipsum, dolor sit amet consectetur adipisicing elit. Nihil, iste.
          Aliquid saepe aliquam cum nihil, molestias est sunt doloribus nam
          cupiditate nostrum quod hic reprehenderit, quo veritatis alias
          accusamus laudantium sequi necessitatibus iste fugiat dolore? Amet
          tempora deleniti esse omnis pariatur! Libero, obcaecati optio expedita
          modi vel praesentium illo beatae, architecto consequatur nostrum
          porro, et aspernatur veritatis perspiciatis qui. Voluptatum magni
          doloribus mollitia quasi in expedita, deserunt eum repellendus neque,
          vitae ratione nostrum explicabo labore aspernatur unde laudantium
          perferendis perspiciatis, non adipisci? Amet aperiam eveniet adipisci
          illum id, asperiores ut fugiat voluptatem dignissimos porro dolorum
          libero delectus fugit tenetur ad provident blanditiis dolor impedit ea
          inventore. Autem sequi error quos placeat voluptatibus rem quisquam
          harum, nesciunt laborum obcaecati non inventore voluptates dolor omnis
          nostrum ipsam illo tempore veritatis culpa labore! Similique nemo
          dolorum ea eaque quod sapiente vero molestias pariatur sit autem
          provident dolore earum modi adipisci atque mollitia ut alias voluptas,
          dignissimos aliquam odit impedit facilis? Voluptate delectus facere
          nesciunt molestias esse modi magnam alias dicta illo minus totam,
          labore quasi consequatur officiis consequuntur minima quam quas quod
          tenetur facilis saepe repellat et aliquam. Quibusdam, nemo doloribus
          vel unde veritatis, quia exercitationem at explicabo quasi fugiat
          alias ipsa inventore!
        </p>
        <Outlet />
        <footer>footer</footer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
