import { useEffect, useRef, useState } from "react";

const Home = ({ fareCharges }) => {
	// travel type
	const [travelType, setTravelType] = useState("tube");

	// travel From
	const [selectedTravelFrom, setselectedTravelFrom] = useState([]);

	// Travel to
	const [selectedTravelTo, setselectedTravelTo] = useState([]);

	// wallet
	const [wallet, setWallet] = useState(0);

	// keeping wallet in Memory
	const [memoWallet, setMemoWallet] = useState(0);

	// refs
	const travelFrom = useRef(null);
	const travelTo = useRef(null);
	const topupInput = useRef(null);

	// adding remaining amount if exit station
	useEffect(() => {
		setWallet(memoWallet);
	}, [memoWallet]);

	// checking fair
	useEffect(() => {
		checkTubeFair(selectedTravelFrom, selectedTravelTo);
	}, [selectedTravelFrom, selectedTravelTo]);

	// topup amount
	const topUp = () => {
        let topupValue = 0;
        if(topupInput.current && topupInput.current.value) {
           topupValue = parseInt(topupInput.current.value, 10);
        }
            if (!topupValue) {
                return;
            }
            setWallet((state) => state + topupValue);
            setMemoWallet((state) => state + topupValue);
        
	};

	// changing travel type
	const selectTravelType = (e) => {
		setTravelType(e.target.value);
	};

	// Enter Start station
	const enterStation = () => {
        if(travelFrom.current && travelFrom.current.value) {
            setselectedTravelFrom(
                (state) => (state = [...travelFrom.current.value])
            );
        }
	};

	// Enter exit station
	const exitStation = () => {
        if(travelTo.current && travelTo.current.value) {
		setselectedTravelTo((state) => (state = [...travelTo.current.value]));
        }
	};

	// Check Tube fair
	const checkTubeFair = (enterStation, exitStation) => {
		if (!enterStation) {
			return;
		}

		// checking bus fair
		if (travelType === "bus") {
			if (exitStation && !exitStation.length) {
				if (wallet >= parseInt(fareCharges.BUS_JOURNEY)) {
					setWallet((state) =>
						(state - fareCharges.BUS_JOURNEY).toFixed(2)
					);
				}
			} else {
				setselectedTravelFrom([]);
				setselectedTravelTo([]);
			}
		} else {
			// checking tube fait
			if (wallet >= parseInt(fareCharges.TUBE_MAX_COST)) {
				if (exitStation && !exitStation.length) {
					setWallet((state) =>
						(state - fareCharges.TUBE_MAX_COST).toFixed(2)
					);
				} else {
					checkTubeTravelCost();
				}
			}
		}
	};

	// clearing exit (Error clearing)
	const clearExit = () => {
		setselectedTravelFrom([]);
	};

	// checking total travel cost (from - to)
	const checkTubeTravelCost = () => {
		//Same Zone else zone change
		if (selectedTravelFrom[0] === selectedTravelTo[0]) {
			// anywhere in zone 1
			selectedTravelFrom.includes("1") &&
				setMemoWallet((state) =>
					(state - fareCharges.ANYWHERE_IN_ZONE_1).toFixed(2)
				);

			// anywhere in zone 2 and 3
			(selectedTravelFrom.includes("2") ||
				selectedTravelFrom.includes("3")) &&
				setMemoWallet((state) =>
					(state - fareCharges.ANY_ONE_ZONE_OUTSIDE_ZONE_1).toFixed(2)
				);
		} else {
			// if 'Earl’s Court'
			if (
				selectedTravelFrom.includes("1") &&
				selectedTravelTo.includes("1")
			) {
				setMemoWallet((state) =>
					(state - fareCharges.ANYWHERE_IN_ZONE_1).toFixed(2)
				);
			}

			// if 'Earl’s Court'
			if (
				selectedTravelFrom.includes("2") &&
				selectedTravelTo.includes("2")
			) {
				setMemoWallet((state) =>
					(
						state - fareCharges.ANY_TWO_ZONES_EXCLUDING_ZONE_1
					).toFixed(2)
				);
			}

			// anywhere in 1 and 2
			if (
				(selectedTravelFrom.includes("1") &&
					selectedTravelTo.includes("2")) ||
				(selectedTravelFrom.includes("2") &&
					selectedTravelTo.includes("1"))
			) {
				setMemoWallet((state) =>
					(
						state - fareCharges.ANY_TWO_ZONES_INCLUDING_ZONE_1
					).toFixed(2)
				);
			}

			// anywhere in 2 and 3
			if (
				(selectedTravelFrom.includes("2") &&
					selectedTravelTo.includes("3")) ||
				(selectedTravelFrom.includes("3") &&
					selectedTravelTo.includes("2"))
			) {
				setMemoWallet((state) =>
					(
						state - fareCharges.ANY_TWO_ZONES_EXCLUDING_ZONE_1
					).toFixed(2)
				);
			}

			// anywhere in 1 and 3
			if (
				(selectedTravelFrom.includes("1") &&
					selectedTravelTo.includes("3")) ||
				(selectedTravelFrom.includes("3") &&
					selectedTravelTo.includes("1"))
			) {
				setMemoWallet((state) =>
					(state - fareCharges.MORE_THAN_TWO_ZONES).toFixed(2)
				);
			}
		}

		// clearing stat station and end station
		setselectedTravelFrom([]);
		setselectedTravelTo([]);
	};

	return (
		<>
			<div className="flex flex1 justify-between bg-gray-50 mb-6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<div className="topup text-lg">
					<input
						className="mr-6 border-b border-gray-200 py-2 px-4"
						type="number"
						id="topup"
						name="topup"
						ref={topupInput}
					/>
					<button
						onClick={topUp}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        id="topup"
                        >
						Topup
					</button>
				</div>
				Wallet £{wallet}
			</div>

			<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg min-h-full px-6 py-6">
				<div className="max-w-xl">
					<div className="flex justify-between border-b border-gray-200 py-3 mb-3">
						<label>Travel type</label>
						<div className="travel-type">
							<select
								name="travelType"
								id="travelType"
								defaultValue={travelType}
								onChange={selectTravelType}
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value="tube">Tube</option>
								<option value="bus">Bus</option>
							</select>
						</div>
					</div>
					<div className="flex justify-between ">
						<label>Travel From</label>
						<div className="travel-from">
							<select
								name="travelFrom"
								id="travelFrom"
								ref={travelFrom}
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value={[1]}>Holborn</option>
								<option value={[1]}>Aldgate</option>
								<option value={[12]}>Earl’s Court</option>
								<option value={[2]}>Hammersmith</option>
								<option value={[2]}>Arsenal</option>
								<option value={[3]}>Wimbledon</option>
							</select>
						</div>
					</div>
					<div className="flex justify-end border-b border-gray-200 py-3 mb-3">
						<button
							onClick={enterStation}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            id="startStationButton"
                            >
							Enter Station
						</button>
					</div>
					<div className="flex justify-between">
						<label>Travel To</label>
						<div className="travel-to">
							<select
								name="travelTo"
								id="travelTo"
								ref={travelTo}
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value={1}>Holborn</option>
								<option value={1}>Aldgate</option>
								<option value={[1, 2]}>Earl’s Court</option>
								<option value={2}>Hammersmith</option>
								<option value={2}>Arsenal</option>
								<option value={3}>Wimbledon</option>
							</select>
						</div>
					</div>

					<div className="flex justify-end  border-b border-gray-200 py-3 mb-3">
						<button
							onClick={exitStation}
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            id="endStationButton"
                            >
							Exit Station
						</button>
					</div>
					<button
						onClick={clearExit}
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        id="clearButton"
                        >
						Clear Exit
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
