import React from 'react'

const StakeModal = ({ onClose, stakingLength, stakingPercent, amount, setAmount, stakeMatic }) => {
    return (
        <>
            <div className='modal-class' onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <h2 className='titleHeader'>Stake Matic</h2>

                        <div className="row">
                            <div className="col-md-9 fieldContainer">
                                <input className='inputField' placeholder='0.0' onChange={e => setAmount(e.target.value)} />
                            </div>

                            <div className='col-md-3 inputFieldContainer'>
                                <span>Matic</span>
                            </div>
                        </div>

                        <div className="row">
                            <h6 className='titleHeader stakingTerms'>
                                {stakingLength} days @ {stakingPercent} APY
                            </h6>
                        </div>

                        <div className="row">
                            <div onClick={() => stakeMatic(amount)} className="orangeButton">
                                Stake Matic
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default StakeModal;