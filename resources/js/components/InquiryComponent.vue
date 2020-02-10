<template>
    <div id="inquiry-component">
        <form method="POST" v-on:submit.prevent="save">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="form-control-label" for="first_name">First Name</label>
                        <input type="text" v-model="lead.first_name" required class="form-control" id="first_name">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="form-control-label" for="middle_initial">Middle Initial</label>
                        <input type="text" v-model="lead.middle_initial" class="form-control" id="middle_initial">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="form-control-label" for="last_name">Last Name</label>
                        <input type="text" v-model="lead.last_name" class="form-control" id="last_name">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label class="form-control-label" for="dob">Date of Birth</label>
                        <input type="date" v-model="lead.dob" class="form-control" id="dob">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="ssn">SSN (social security number)</label>
                        <input type="text" v-model="lead.ssn" class="form-control" id="ssn">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="mmn">MMN (months maiden name)</label>
                        <input type="text" v-model="lead.mmn" class="form-control" id="mmn">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input type="text" v-model="lead.email" class="form-control" id="email">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="address">Address</label>
                        <input type="text" v-model="lead.address" class="form-control" id="address">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="best_time_to_call">Best Time to Call</label>
                        <input type="time" v-model="lead.best_time_to_call" class="form-control" id="best_time_to_call">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="timezone">Time Zone</label>
                        <select v-model="lead.timezone" id="timezone" class="form-control custom-select">
                            <option value="EST">EST</option>
                            <option value="PST">PST</option>
                            <option value="CST">CST</option>
                            <option value="MST">MST</option>
                            <option value="HST">HST</option>
                            <option value="AKST">AKST</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="state">State</label>
                        <input type="text" v-model="lead.state" class="form-control" id="state">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="zip_code">Zip Code</label>
                        <input type="text" v-model="lead.zipcode" class="form-control" id="zip_code">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="gender">Gender</label>
                        <select v-model="lead.gender" id="gender" class="form-control custom-select">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="phone_number">Phone Number</label>
                        <input type="text" v-model="lead.phone_number" required class="form-control" id="phone_number">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="alt_phone_number">Alternative Phone #</label>
                        <input type="text" v-model="lead.alt_phone_number" class="form-control" id="alt_phone_number">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="city">City</label>
                        <input type="text" v-model="lead.city" class="form-control" id="city">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="total_debit">Total Debit</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="text" v-model="lead.total_debit" class="form-control" id="total_debit" aria-label="Amount (to the nearest dollar)">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="apr2">APR %</label>
                        <input type="text" v-model="lead.apr" class="form-control" id="apr2">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="credit_score">Credit Score</label>
                        <input type="text" v-model="lead.credit_score" class="form-control" id="credit_score">
                    </div>
                </div>
            </div>

            <hr>

            <h2>Bank Accounts</h2>
            <template v-for="(account, index) in lead.bank_accounts">
                <h3>Account # {{ index + 1 }}
                    <span class="btn btn-sm btn-danger btn-rounded pull-right" v-show="index > 0" v-on:click.prevent="removeAccount(index)">
                        <i class="fa fa-minus-circle m-r-5"></i> Delete
                    </span>
                </h3>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="bank_name">Bank Name</label>
                            <input type="text" v-model="account.bank_name" class="form-control" id="bank_name">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="account_number">Account Number</label>
                            <input type="text" v-model="account.account_number" class="form-control" id="account_number">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="apr">APR %</label>
                            <input type="text" v-model="account.apr" class="form-control" id="apr">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-control-label" for="current_balance">Current Balance</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input type="text" v-model="account.current_balance" class="form-control" id="current_balance" aria-label="Amount (to the nearest dollar)">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-control-label" for="available_balance">Available Balance</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input type="text" v-model="account.available_balance" class="form-control" id="available_balance" aria-label="Amount (to the nearest dollar)">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-control-label" for="last_payment">Last Payment</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input type="text" v-model="account.last_payment" class="form-control" id="last_payment" aria-label="Amount (to the nearest dollar)">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-control-label" for="due_payment">Due Payment</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input type="text" v-model="account.due_payment" class="form-control" id="due_payment" aria-label="Amount (to the nearest dollar)">
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="form-group">
                <button type="button" class="btn btn-sm btn-info btn-rounded" v-on:click.prevent="addNewAccount">
                    <i class="fa fa-plus-circle m-r-5"></i> Create New Account
                </button>
            </div>

            <div class="form-group">
                <input v-model="lead.lead_type" type="radio" id="lead" value="lead" class="with-gap radio-col-pink">
                <label class="form-control-label" for="lead">Lead</label>

                <input v-model="lead.lead_type" type="radio" id="callback" value="callback" class="with-gap radio-col-pink">
                <label class="form-control-label" for="callback">Callback</label>

                <input v-model="lead.lead_type" type="radio" id="transfer" value="transfer" class="with-gap radio-col-pink">
                <label class="form-control-label" for="transfer">Transfer</label>
            </div>

            <div class="form-group">
                <label class="form-control-label" for="notes">Notes</label>
                <textarea v-model="lead.notes" id="notes" rows="3" class="form-control"></textarea>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-success waves-effect waves-light m-r-10">Save</button>
                <a v-bind:href="'/inquiries/'+inquirytype" class="btn btn-inverse waves-effect waves-light">Cancel</a>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "InquiryComponent",
        props: ["currentinquiry", "inquirytype"],
        action: "",
        data() {
            return {
                bank_account: {},
                lead: {
                    id: 0,
                    gender: "Male",
                    timezone: "EST",
                    lead_type: "lead",
                    bank_accounts: []
                }
            }
        },
        mounted() {
            this.action = BASE_URL+"/inquiries/store";
            if (this.currentinquiry) {
                this.lead = JSON.parse(this.currentinquiry);
                this.action = BASE_URL+`/inquiries/update/${this.lead.id}`;
            }
        },
        created: function () {
            // Init empty bank_account object.
            this.bank_account.id = 0;
            this.bank_account.lead_id = 0;
            this.bank_account.bank_name = "";
            this.bank_account.account_number = "";
            this.bank_account.apr = "";
            this.bank_account.current_balance = "";
            this.bank_account.available_balance = "";
            this.bank_account.last_payment = "";
            this.bank_account.due_payment = "";
            this.pushToBankAccounts(this.bank_account);
        },
        methods: {
            getCloneObject(myObject) {
                return JSON.parse( JSON.stringify( myObject ) );
            },
            pushToBankAccounts(account) {
                account = this.getCloneObject(account);
                this.lead.bank_accounts.push(account);
            },
            addNewAccount() {
                this.pushToBankAccounts(this.bank_account);
            },
            removeAccount(index) {
                // Starting at index position, remove one element
                this.lead.bank_accounts.splice(index, 1);
            },
            save() {
                axios.post(this.action, { lead: this.lead })
                .then(response => {
                    console.log(response);
                    window.location.href = BASE_URL+"/inquiries/"+this.inquirytype;
                })
                .catch(error => {
                    console.log(error)
                });
            }
        }
    }
</script>

<style scoped>

</style>