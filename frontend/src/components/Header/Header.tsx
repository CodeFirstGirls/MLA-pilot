'use client'

import { useCookies } from 'react-cookie'
import { Container, Group, Burger, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSquarePlus, IconLogout } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import classes from './Header.module.css'
import Image from 'next/image'
import { Modal, Button } from '@mantine/core'
import { clearCurrentUser } from '../../utils/sessionStorage'
import AddExerciseModal, { AddExercieModalTitle } from '../AddExerciseModal'

const Header = () => {
  const router = useRouter()
  const [openedModal, { open: openModal, close: closeModal }] =
    useDisclosure(false)
  const [openedDrawer, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)
  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  const logout = () => {
    clearCurrentUser()
    removeCookie('authToken')
    router.push('/login')
  }
  const addEventModal = () => {
    openModal()
    closeDrawer()
  }

  return (
    <>
      <Modal
        opened={openedModal}
        onClose={closeModal}
        title={AddExercieModalTitle()}
      >
        <AddExerciseModal close={closeModal} />
      </Modal>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Image
            width={40}
            height={50}
            src="/CFG_logo_inverted.png"
            alt="CFG logo"
            loading="lazy"
          />
          <Group gap={5} visibleFrom="xs">
            <>
              <Button onClick={openModal} className={classes.headerButton}>
                <IconSquarePlus className={classes.headerButtonIcon} />
                Add Exercise
              </Button>
              <div className={classes.verticalDivider}></div>
              <Button onClick={() => logout()} className={classes.headerButton}>
                <IconLogout className={classes.headerButtonIcon} />
                Logout
              </Button>
            </>
          </Group>

          <Burger
            opened={openedDrawer}
            onClick={toggleDrawer}
            hiddenFrom="xs"
            size="sm"
            color="white"
          />
        </Container>
      </header>
      <Drawer.Root
        opened={openedDrawer}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Drawer.Overlay />
        <Drawer.Content className={classes.drawer}>
          <Drawer.Header className={classes.drawer}>
            <Drawer.CloseButton color="white" />
          </Drawer.Header>
          <Drawer.Body className={classes.drawer}>
            <div className={classes.drawer}>
              <Button onClick={addEventModal} className={classes.headerButton}>
                <IconSquarePlus className={classes.headerButtonIcon} />
                Add Exercise
              </Button>
              <hr className={classes.horizontalDivider}></hr>
              <Button onClick={() => logout()} className={classes.headerButton}>
                <IconLogout className={classes.headerButtonIcon} />
                Logout
              </Button>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  )
}

export default Header
