import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react';
import { Doctor } from '../page';

export default function DoctorDetails({ doctor }: { doctor: Doctor }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Details</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {doctor.nom}
              </ModalHeader>
              <ModalBody>
                <ul>
                  <li>
                    <b>Specialite:</b> {doctor.specialite}
                  </li>
                  <li>
                    <b>Age:</b> {doctor.age} Ans
                  </li>
                  <li>
                    <b>Experience:</b> {doctor.experience} Ans
                  </li>
                  <li>
                    <b>Adresse:</b> {doctor.adresse}
                  </li>
                  <li>
                    <b>Patient:</b> {doctor.patientName}
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
