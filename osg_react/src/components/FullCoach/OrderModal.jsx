import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useState } from 'react';

Modal.setAppElement('#root');

const OrderModal = ({ modalIsOpen, afterOpenModal, closeModal }) => {
	const api = useAxios();
	const navigate = useNavigate();
	const [sending, setSending] = useState(false);

	const sendApplicationAsUser = async (data) => {
		try {
			const res = await api.post('/coach/api/send_user_application', data);
			navigate('/cabinet/requests');
			return res;
		} catch (err) {
			console.error(err);
		}
	};

	const { register, handleSubmit, reset, control } = useForm({
		defaultValues: {
			subject: '',
			message: '',
		},
		mode: 'onSubmit',
	});
	const closeOrderModal = () => {
		closeModal();
		reset();
	};

	const onSubmit = async (values) => {
		setSending(true);
		await sendApplicationAsUser({
			...values,
			rate: modalIsOpen.rates[Number(values.rate)],
			coach: modalIsOpen.coach_id,
		});
		closeOrderModal();
	};

	return (
		<Modal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={() => (document.body.style.overflow = 'hidden')}
			onAfterClose={() => (document.body.style.overflow = 'unset')}
			onRequestClose={closeOrderModal}
			className={'mx-auto my-auto w-fit'}
			contentLabel="Fill order">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button type="button" onClick={closeOrderModal}>
						<XMarkIcon className="w-10 h-10 text-black" />
					</button>
				</div>
				<form className="mb-12 space-y-4 sm:space-y-8 sm:px-24" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="px-6 text-4xl text-center">Заповніть заявку</h2>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Тема
						</span>
						<input
							type="text"
							{...register('subject', { required: 'Вкажіть тему' })}
							className="w-full px-4 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>
					<div>
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Виберіть абонемент
						</span>
						<Controller
							control={control}
							name="rate"
							defaultValue={String(modalIsOpen.activeSubType)}
							render={({ field }) => (
								<select
									{...field}
									className="block w-full px-4 py-2 text-xl border rounded focus:ring-black focus:border-black ">
									{modalIsOpen.subs?.map((obj, index) => (
										<option key={index} value={String(index)} className="text-lg">
											{obj}
										</option>
									))}
								</select>
							)}
						/>
					</div>
					<div className="w-full">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Опис
						</span>
						<textarea
							{...register('message', { required: 'Вкажіть текст заявки' })}
							className="w-full rounded resize-none min-h-[8rem] h-full text-xl focus:border-black focus:ring-black"></textarea>
					</div>
					<button
						type="submit"
						className="inline-block select-none text-center w-full min-w-[8rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						{sending ? 'Опрацювання...' : 'Відправити'}
					</button>
				</form>
			</div>
		</Modal>
	);
};

export default OrderModal;
