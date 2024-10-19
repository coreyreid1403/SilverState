Diagram
https://docs.google.com/presentation/d/13h11gKi2qd6S7CwsSAkK8sw2g1TGT5Ufq61WRTIUhfw/edit?usp=sharing

Design Docs
https://docs.google.com/document/d/1aSbF9YpqfJwtWfnRRrWTmmCtfT0jhsseWIv0nAkLl0w/edit
 Sites for styles
 https://react-bootstrap.netlify.app/components/alerts/#links
 https://mdbootstrap.com/docs/react/extended/hamburger-menu/
 
 
 LumiFundraising
 https://docs.google.com/document/d/1j4_4mdu4y8YHxrWhFdi7hAu0uhL2-3UCZP_mQ_ALgP0/edit?usp=sharing

 Styling Framework
 https://mui.com/material-ui/customization/how-to-customize/

 Database
 https://console.firebase.google.com/project/recipe-book-872c8/database/recipe-book-872c8-default-rtdb/data

 saving an image
import Image from 'next/image' Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />

Extensions: Prettier, eslint, Better Comments, code spell checker

## Getting Started

First, run the development server:

```bash
npm run dev

 runs on http://localhost:3000

 TODO: 
 1. update database calls to update just one property, not whole object
 2. To make button Say Loading, i think we will have to use a class, with setState instead of useState so we can make a callback function
 3. ADd checks for username and password
 4. Can add mdb tabs in add athlete page fro all the coaches views


 Skeleton:
    <div>
      <h1>{props.title || <Skeleton />}</h1>
      {props.body || <Skeleton count={10} />}
    </div>

StyledDiv:
    const Box = styled.div<{ $background?: string; }>({
        background: '#BF4F74',
        height: '50px',
        width: '50px'
    });

    const OtherBox = styled.div<{ isPending?: boolean; }>({
        background: p{p => (p.isPending ? white : blue)},
        height: '50px',
        width: '50px'
    });

    const OtherBox2 = styled.div<{ color?: string; }>({
        ${({color}) => {
            if(color){
                return `--backgroundColor: var(--label-{$color});`;
            }
        }}
        background: 'var(--backgroundColor)',
        height: '50px',
        width: '50px'
    });

    <PropsBox $background="blue" />


ADDING NEW FUNDRAISER
- Add new product to Stripe
- Add new test product to Stripe
- Add env var to vercel
- Add test product to local env var
- Update Constants for team and offset