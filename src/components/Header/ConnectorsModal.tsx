import React, { useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount, useConnect } from "wagmi";
import LoadingIcon from "../../utils/LoadingIcon";

type ConnectorModalProps = {
  isOpen: boolean;
  closeModal: (value?: boolean) => void;
};

const ConnectorsModal = ({ isOpen, closeModal }: ConnectorModalProps) => {
  const style = {
    dialog: "z-[1000] relative",
    overlay: "fixed inset-0 bg-black/50",
    dialogMain: "fixed inset-0 overflow-y-auto",
    dialogDiv: "flex min-h-full items-center justify-center p-4 text-center",
    dialogPanel:
      "w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-dark-box p-6 text-left align-middle shadow-xl transition-all",
    dialogHeading:
      "text-lg font-bold leading-6 text-light-font-lightV1 dark:text-dark-font-lightV1",
    dialogBody: "mt-4",
    allProviders:
      "mb-3 w-full max-w-md inline-flex justify-center rounded-md border border-transparent bg-gray-300 dark:bg-dark-primary-grey px-4 py-2 text-sm font-medium text-light-font-lightV1 dark:text-dark-font-lightV1 hover:bg-gray-400 hover:dark:bg-dark-border-light focus:outline-none",
    error: "text-error",
  };

  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  useEffect(() => {
    if (isConnected && address && isOpen) {
      closeModal();
    }
  }, [isConnected, address, isOpen, closeModal]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" onClose={closeModal} className={style.dialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={style.overlay}></div>
        </Transition.Child>
        <div className={style.dialogMain}>
          <div className={style.dialogDiv}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={style.dialogPanel}>
                <Dialog.Title className={style.dialogHeading} as="h3">
                  Connect Wallet
                </Dialog.Title>
                <div className={style.dialogBody}>
                  {connectors.map((connector) => (
                    <button
                      className={style.allProviders}
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => connect({ connector })}
                    >
                      {isLoading && connector.id === pendingConnector?.id && (
                        <LoadingIcon />
                      )}
                      {connector.name}
                      {!connector.ready && " (unsupported)"}
                    </button>
                  ))}
                  {error && <div className={style.error}>{error.message}</div>}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConnectorsModal;
