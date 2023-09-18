// ** Icon imports
// import Login from 'mdi-material-ui/Login'
// import Table from 'mdi-material-ui/Table'

// import CubeOutline from 'mdi-material-ui/CubeOutline'
// import HomeOutline from 'mdi-material-ui/HomeOutline'
// import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
// import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
// import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
// import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
// import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
// import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import {
  DfsCPIcon,
  DPIcon,
  GraphIcon,
  HashIcon,
  HeapIcon,
  LinkedListIcon,
  MatrixIcon,
  QueueIcon,
  SlidingWindowIcon,
  StackIcon,
  TreeIcon,
  TwoPointersIcon,
  UncategorizedIcon
} from '../../components/icons';

// ** Type import
import {VerticalNavItemsType} from '../../layouts/types'


const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Tree',
      icon: TreeIcon,
      path: '/'
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Tree',
    //   icon: TreeIcon,
    //   path: '/algorithm/tree',
    // },
    {
      title: 'Graph',
      icon: GraphIcon,
      path: '/algorithm/graph',
    },
    {
      title: 'LinkedList',
      icon: LinkedListIcon,
      path: '/algorithm/linked-list',
    },
    {
      title: 'DFS Combination Permutation',
      icon: DfsCPIcon,
      path: '/algorithm/dfs-combination-permutation',
    },
    {
      title: 'Dynamic Programing',
      icon: DPIcon,
      path: '/algorithm/dp',
    },
    {
      title: 'Hash (Map, Set)',
      icon: HashIcon,
      path: '/algorithm/hash',
    },
    {
      title: 'Heap Priority Queue',
      icon: HeapIcon,
      path: '/algorithm/heap-priority-queue',
    },
    {
      title: 'Queue Deque',
      icon: QueueIcon,
      path: '/algorithm/queue-deque',
    },
    {
      title: 'Matrix',
      icon: MatrixIcon,
      path: '/algorithm/matrix',
    },
    {
      title: 'Sliding Window',
      icon: SlidingWindowIcon,
      path: '/algorithm/sliding-window',
    },
    {
      title: 'Stack',
      icon: StackIcon,
      path: '/algorithm/stack',
    },
    {
      title: 'Two Pointers',
      icon: TwoPointersIcon,
      path: '/algorithm/two-pointers',
    },
    {
      title: 'Uncategorized',
      icon: UncategorizedIcon,
      path: '/algorithm/uncategorized',
    },

    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // }

    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
