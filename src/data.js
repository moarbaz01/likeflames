import avatar1 from '../src/assets/avatars/avatar1.png'
import avatar2 from '../src/assets/avatars/avatar2.png'
import avatar3 from '../src/assets/avatars/avatar3.png'
import avatar4 from '../src/assets/avatars/avatar4.png'
import avatar5 from '../src/assets/avatars/avatar5.png'
import avatar6 from '../src/assets/avatars/avatar6.png'
import avatar7 from '../src/assets/avatars/avatar7.png'
import reel2 from './assets/reel2.mp4'
export const stories = [
    {
        name: 'Your Story',
        bg: 'https://images.pexels.com/photos/1998443/pexels-photo-1998443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        profile: avatar2
    },
    {
        name: 'Sharukh',
        bg: 'https://images.pexels.com/photos/3845057/pexels-photo-3845057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        profile: avatar1
    },
    {
        name: 'Ravi Kumar',
        bg: 'https://images.pexels.com/photos/57457/parade-local-trumpet-musician-ritual-57457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        profile: avatar3
    },
    {
        name: 'Hari Ram',
        bg: 'https://images.pexels.com/photos/11563688/pexels-photo-11563688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        profile: avatar4
    }
];

export const requests = [
    {
        profile: avatar5,
        name: "Pankaj",
        mutuals: 2
    },
    {
        profile: avatar6,
        name: "Sneha Sharma",
        mutuals: 1
    },
    {
        profile: avatar7,
        name: "MS Dhoni",
        mutuals: 0
    },
];


export const posts = [
    {
        user: {
            name: "Pankaj",
            username: 'pankajrao12',
            profile: avatar5
        },
        caption: "This is my first post",
        file: "https://images.unsplash.com/photo-1697182711822-c1b620288a2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        likes: 2,
        comments: 2
    },
    {
        user: {
            name: "Rahul Roy",
            username: 'rahulroy_342',
            profile: avatar3,
        },
        caption: "Hello Everyone this is my first post on LikeFlames",
        file: "https://images.unsplash.com/photo-1712884517129-103f91c9e59c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        likes: 12,
        comments: 23
    },
    {
        user: {
            name: "Kamal Hasan",
            username: 'kamalh132',
            profile: avatar7,
        },
        caption: "I am kamal Hasan!",
        file: reel2,
        likes: 12,
        comments: 23
    },

];


export const comments = [
    {
        user: {
            name: "Kamal Hasan",
            username: 'kamalh132',
            profile: avatar7,
        },
        gif: "https://media.tenor.com/5lLcKZgmIhgAAAAC/american-psycho-patrick-bateman.gif",
        likes: 12,
        reciever: 'rahulroy_342',
        comment: "I am kamal Hasan!",
        replies: [
            {
                user: {
                    name: "Pankaj",
                    username: 'kajubhai',
                    profile: avatar5,
                },
                gif: "https://media1.tenor.com/m/HQcfsVLt2F8AAAAC/tom-and-jerry-tom-the-cat.gif",
                comment: "I am Pankaj!",
                likes: 4,
                reciever: "kamalh132"
            },
            {
                user: {
                    name: "Arjun",
                    username: 'arjunpal',
                    profile: avatar7,
                },
                gif: "https://media1.tenor.com/m/H4hl0RQOsVQAAAAC/iceage-possum.gif",
                comment: "I am Pankaj!",
                likes: 4,
                reciever: "kajubhai"
            }
        ]
    },
    {
        user: {
            name: "Ramu kaka",
            username: 'kamalh132',
            profile: avatar2,
        },
        gif: "https://media1.tenor.com/m/tWkLGHemhukAAAAC/earthquake-fresh-prince-of-belair.gif",
        likes: 12,
        reciever: 'rahulroy_342',
        comment: "Kuch bhi.....",

    }
]
