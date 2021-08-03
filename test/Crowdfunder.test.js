
const Crowdfunder = artifacts.require('./Crowdfunder.sol');

contract('Crowdfunder', ([deployer,fundOwner, donor]) => {
    let crowdfunder;

    before(async () => {
        crowdfunder = await Crowdfunder.deployed();
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await crowdfunder.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);

        })

        it('has a name', async () =>{
            const name = await crowdfunder.name();
            assert.equal(name, "Crowdfunder");
        })

        it('initialized funds', async () => {
            const fundCount = await crowdfunder.fundCount();
            assert(fundCount, 2);
        })
    })


    describe('crowdfunding', async () => {
        let result, fundCount;

        before(async () => {
            result = await crowdfunder.createFund("Tom's Diner", web3.utils.toWei('1', 'Ether'), { from: fundOwner });
            fundCount = await crowdfunder.fundCount();
        })

        it('creates funds', async () => {
            assert(fundCount, 3);
            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), fundCount.toNumber());
            assert.equal(event.name, "Tom's Diner");
            assert.equal(event.fundOwner, fundOwner);
            assert.equal(event.targetAmount, web3.utils.toWei('1', 'Ether'));
        })

        it('allows users to donate', async () => {
            let oldFundBalance;
            oldFundBalance = await web3.eth.getBalance(fundOwner);
            oldFundBalance = new web3.utils.BN(oldFundBalance);

            fundCount = await crowdfunder.fundCount();
            result = await crowdfunder.donate(fundCount, { from: donor, value: web3.utils.toWei('0.1', 'Ether') });

            const event = result.logs[0].args;
            assert.equal(event.id.toNumber(), fundCount.toNumber(), 'id is correct');
            assert.equal(event.amount, web3.utils.toWei('0.1', 'Ether'), 'donation is correct');
            assert.equal(event.donor, donor, 'donor is correct');
            

            
            let newFundBalance;
            newFundBalance = await web3.eth.getBalance(fundOwner);
            newFundBalance = new web3.utils.BN(newFundBalance);

            let donation;
            donation = web3.utils.toWei('0.1', 'Ether');
            donation = new web3.utils.BN(donation);
            console.log(oldFundBalance.toString());
            console.log(newFundBalance.toString());
            const expectedBalance = oldFundBalance.add(donation);
            assert.equal(expectedBalance.toString(), newFundBalance.toString());
        
            
 
        })
    })

})